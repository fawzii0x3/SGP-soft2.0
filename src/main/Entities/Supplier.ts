import { ObjectType, Field, ID } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Item from './Item'

@ObjectType()
@Entity()
export default class Supplier extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field(() => String)
  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  phone?: string

  @OneToMany(() => Item, (item) => item.supplier)
  items!: Item[]
}
