import { ObjectType, Field, ID } from 'type-graphql'
import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm'

@ObjectType()
@Entity()
export default class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn('uuid')
  id!: string
  
  @Field(()=>String)
  @Column({ type: 'varchar', length: 255 })
  name!: string
}
