import { Arg, InputType, Field, Mutation, ObjectType, Query, Resolver, Ctx } from 'type-graphql'
import Product from './Product'
import { FieldError } from './FieldError'
import ShortUniqueId from 'short-unique-id'
@ObjectType()
class ProductResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => Product, { nullable: true })
  product?: Product
}
@InputType()
class ProductInput {
  @Field(()=>String,{ nullable: true })
  id?: string

  @Field(()=>String)
  name!: string
}

@Resolver()
export default class ProductResolver {
  private uuid: ShortUniqueId
  constructor() {
    this.uuid = new ShortUniqueId({ length: 10 })
  }
  @Query(() => [Product])
  async products(
    
  ): Promise<Product[]> {
    
    return Product.find()
  }
  @Mutation(() => ProductResponse)
  async createProduct(@Arg('data',()=>ProductInput) data: ProductInput,
  @Ctx() {req}:MyContext
  ): Promise<ProductResponse> {
    try {
      if(data.id){
        data.id.replace(/s/,"")
      }
      data.id = data.id || this.uuid()
      const product = await Product.create({ ...data }).save()
      req.session.productId = product.id
      return {
        product
      }
    } catch (err:any) {
      return {
        errors: [
          {
            field: 'NaN',
            message: err?.message
          }
        ]
      }
    }
  }
}
