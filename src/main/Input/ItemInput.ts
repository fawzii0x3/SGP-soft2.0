import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class CreateItemInput {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field(() => String)
  brandName!: string

  @Field(() => String)
  model!: string

  @Field(() => String)
  color: string

  @Field(() => Number)
  minQuantity!: number

  @Field(() => Number)
  minPrice!: number

  @Field(() => Number)
  maxPrice!: number

  @Field(() => Number)
  buyPrice!: number

  @Field(() => Number)
  quantity!: number


  @Field(() => String)
  supplierName: string
}
@InputType()
export class UpdateItemInput {

  @Field(() => String)
  brandName!: string

  @Field(() => String)
  model!: string

  @Field(() => String)
  color: string

  @Field(() => Number)
  minQuantity!: number

  @Field(() => Number)
  minPrice!: number

  @Field(() => Number)
  maxPrice!: number

  @Field(() => Number)
  buyPrice!: number

  @Field(() => Number)
  quantity!: number


  @Field(() => String)
  supplierName: string
}
