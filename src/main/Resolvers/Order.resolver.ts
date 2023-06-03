import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { Item, Order, SoldItem, User } from '../Entities'
import { FieldError } from '../FieldError'

@ObjectType()
class OrderResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => Order, { nullable: true })
  order?: Order
}
@Resolver()
export default class OrderResolver {
  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    return Order.find()
  }

  @Mutation(() => OrderResponse)
  async handelOrder(
    @Arg('id', () => String) id: string,
    @Ctx() { req }: MyContext
  ): Promise<OrderResponse> {
    if (!req.session.orderId) {
      const item = await Item.findOne({
        where: { id },
        relations: {
          brand: true
        }
      })
      const { brand, model, maxPrice, color, buyPrice, minPrice } = item
      const soldItem = await SoldItem.create({
        color,
        soldPrice: maxPrice,
        name: `${brand.name} ${model}`,
        buyPrice,
        minPrice,
        item: item
      }).save()
      const seller = await User.findOneBy({ id: req.session.userId })
      const order = await Order.create({
        seller,
        soldItems: [soldItem]
      }).save()
      req.session.orderId = order.id
      return {
        order
      }
    } else {
      const order = await Order.findOne({
        where: {
          id: req.session.orderId
        },
        relations: {
          seller: true,
          soldItems: {
            item: true
          }
        }
      })
      const soldItemIndex = order.soldItems.findIndex(({ item }) => {
        return item.id === id
      })
      if (soldItemIndex === -1) {
        const item = await Item.findOne({
          where: { id },
          relations: {
            brand: true
          }
        })
        const { brand, model, maxPrice, color,buyPrice,minPrice } = item
        const soldItem = await SoldItem.create({
          color,
          soldPrice: maxPrice,
          name: `${brand.name} ${model}`,
          buyPrice,minPrice,
          item: item
        }).save()
        order.soldItems.push(soldItem)
        await order.save()
        return {
          order
        }
      } else {
        const soldItem = order.soldItems[soldItemIndex]
        soldItem.quantity += 1
        await soldItem.save()
        order.soldItems[soldItemIndex] = soldItem
        await order.save()
        return {
          order
        }
      }
    }
  }

  @Query(() => Order, { nullable: true })
  async MyOrder(@Ctx() { req }: MyContext): Promise<Order | null> {
    if (req.session.orderId) {
      return Order.findOne({
        where: {
          id: req.session.orderId
        },
        relations: {
          soldItems: {
            item: true
          },
          seller: true
        }
      })
    }
    return null
  }
  @Mutation(() => Order, { nullable: true })
  async removeItem(
    @Ctx() { req }: MyContext,
    @Arg('id', () => String) id: string
  ): Promise<Order | null> {
    const order = await Order.findOne({
      where: {
        id: req.session.orderId
      },
      relations: {
        seller: true,
        soldItems: {
          item: true
        }
      }
    })
    const itemIndex = order.soldItems.findIndex((item) => item.id === id)
    if (order.soldItems[itemIndex].quantity === 1 && order.soldItems.length === 1) {
      const item = await SoldItem.findOneBy({ id })
      await item.remove()
      await order.remove()
      req.session.orderId = null
      return null
    }
    if (order.soldItems[itemIndex].quantity === 1) {
      const item = await SoldItem.findOneBy({ id })
      await item.remove()
      order.soldItems = order.soldItems.filter((a) => a.id !== id)
      await order.save()
      return order
    }
    order.soldItems[itemIndex].quantity -= 1
    const item = await SoldItem.findOneBy({ id })
    item.quantity -= 1
    await item.save()
    return order.save()
  }
}
