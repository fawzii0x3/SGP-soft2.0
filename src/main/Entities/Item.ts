import { ObjectType, Field, ID } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import Brand from './Brand'
import Supplier from './Supplier'
import SoldItem from './SoldItem'

@ObjectType()
@Entity()
export default class Item extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ type: 'text' })
  public id!: string
  
  @Field(() => Brand)
  @ManyToOne(() => Brand, (brand) => brand.items)
  public brand!: Brand

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  public model!: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  public color?: string
  
  @Field(() => Number)
  @Column({ type: 'integer',unsigned:true })
  public quantity!: number

  @Field(() => Number)
  @Column({ type: 'integer',unsigned:true })
  public minQuantity!: number
  
  @Field(() => Number)
  @Column({ type: 'real',unsigned:true })
  public minPrice!: number
  
  @Field(() => Number)
  @Column({ type: 'real' ,unsigned:true})
  public maxPrice!: number
  
  @Field(() => Number)
  @Column({ type: 'real' ,unsigned:true})
  public buyPrice!: number
  

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  public selected!: boolean
  
  @Field(() => Supplier, { nullable: true })
  @ManyToOne(() => Supplier, (supplier) => supplier.items)
  public supplier?: Supplier

  @OneToMany(() => SoldItem, (soldItem) => soldItem.item, { nullable: true })
  public soldItems?: SoldItem[]
}
