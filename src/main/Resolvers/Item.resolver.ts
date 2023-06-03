import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { Brand, Item, SoldItem, Supplier } from '../Entities'
import { FieldError } from './FieldError'
import { CreateItemInput, UpdateItemInput } from '../Input/ItemInput'
import ShortUniqueId from 'short-unique-id'

@ObjectType()
class ItemResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => Item, { nullable: true })
  item?: Item
}
@Resolver()
export default class ItemResolver {
  private uuid: ShortUniqueId
  constructor() {
    this.uuid = new ShortUniqueId({ length: 10 })
  }

  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return Item.find({
      relations: {
        brand: true,
        supplier: true
      }
    })
  }
  @Mutation(() => ItemResponse)
  async createItem(
    @Arg('data', () => CreateItemInput) data: CreateItemInput
  ): Promise<ItemResponse> {
    try {
      let { id, brandName, supplierName, ...itemProps } = data
      itemProps.minQuantity = Math.floor(itemProps.minQuantity)
      itemProps.quantity = Math.floor(itemProps.quantity)
      id = id.replace(/\s+/g, '')
      if (id.length === 0) {
        id = await this.uuid()
      } else {
        const item = await Item.findOneBy({ id })
        if (item) {
          return {
            errors: [
              {
                target: 'id',
                message: 'code a barre deja exist'
              }
            ]
          }
        }
      }
      let brand = await Brand.findOneBy({ name: brandName })
      if (!brand) {
        brand = await Brand.create({ name: brandName }).save()
      }
      let supplier = await Supplier.findOneBy({ name: supplierName })
      if (!supplier) {
        supplier = await Supplier.create({ name: supplierName }).save()
      }
      const item = await Item.create({ ...itemProps, brand, supplier, id }).save()
      return { item }
    } catch (error) {
      return {
        errors: [
          {
            target: 'NaN',
            message: error.message
          }
        ]
      }
    }
  }
  @Mutation(() => ItemResponse)
  async EditItem(
    @Arg('data', () => UpdateItemInput) data: UpdateItemInput,
    @Arg('id', () => String) id: string
  ): Promise<ItemResponse> {
    try {
      let { brandName, supplierName, ...itemProps } = data
      const item = await Item.findOne({
        where: {
          id
        },
        relations: {
          brand: true,
          supplier: true
        }
      })
      let brand = await Brand.findOneBy({ name: brandName })
      if (!brand) {
        brand = await Brand.create({ name: brandName }).save()
      }
      let supplier = await Supplier.findOneBy({ name: supplierName })
      if (!supplier) {
        supplier = await Supplier.create({ name: supplierName }).save()
      }
      item.brand = brand
      item.supplier = supplier
      item.buyPrice = itemProps.buyPrice
      item.maxPrice = itemProps.maxPrice
      item.minPrice = itemProps.minPrice
      item.quantity = itemProps.quantity
      item.minQuantity = itemProps.minQuantity
      item.quantity = itemProps.quantity
      item.model = itemProps.model
      await item.save()
      return { item }
    } catch (error) {
      return {
        errors: [
          {
            target: 'NaN',
            message: error.message
          }
        ]
      }
    }
  }
  @Mutation(() => Boolean)
  async deleteItem(@Arg('id', () => String) id: string): Promise<boolean> {
    await SoldItem.update({item:{id}},{item:null})
    const item = await Item.findOneBy({ id })
    item.remove()
    return true
  }
}
