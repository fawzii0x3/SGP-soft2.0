import { NonEmptyArray } from "type-graphql";
import UserResolver from "./User.resolver";
import ItemResolver from "./Item.resolver";
import OrderResolver from "./Order.resolver";

export default [
    UserResolver,
    ItemResolver,
    OrderResolver
] as NonEmptyArray<Function>