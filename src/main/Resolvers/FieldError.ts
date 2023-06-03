import { Field, ObjectType,} from "type-graphql";

@ObjectType()
export class FieldError {
  @Field(()=>String)
  target!: string;
  @Field(()=>String)
  message!: string;
}
 