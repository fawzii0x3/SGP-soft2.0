import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput{
    @MinLength(2)
    @Field(() => String)
    name!: string
    
    @MinLength(6)
    @Field(() => String)
    password!: string
    
    @Field(() => Boolean)
    privilege!: boolean
} 
@InputType()
export class UserLogin{
    @MinLength(2)
    @Field(() => String)
    name!: string
    
    @MinLength(6)
    @Field(() => String)
    password!: string
} 