import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Order from './Order'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number
  
  @Field(() => String)
  @Index()
  @Column({ type: 'text' })
  name!: string
  
  @Column({ type: 'text' })
  password!: string
  
  @Field(() => Boolean)
  @Column({ type: 'boolean' })
  privilege!: boolean

  @OneToMany(() => Order, (order) => order.seller,{nullable:true})
  orders?: Order[]
}
