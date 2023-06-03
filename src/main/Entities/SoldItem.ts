import { ObjectType, Field, ID } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Order from './Order'
import Item from './Item'

@ObjectType()
@Entity()
export default class SoldItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Field(() => Number)
  @Column({ type: 'integer', default: 1 })
  quantity!: number

  @Field(() => Number)
  @Column({ type: 'integer'})
  soldPrice!: number

  @Field(() => Number)
  @Column({ type: 'real',unsigned:true })
  minPrice!: number
  
  @Field(() => Number)
  @Column({ type: 'real' ,unsigned:true})
  buyPrice!: number

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  color?: string

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.soldItems)
  public order!: Order

  @Field(() => Item, { nullable: true })
  @ManyToOne(() => Item, (item) => item.soldItems, { nullable: true })
  public item!: Item
}
