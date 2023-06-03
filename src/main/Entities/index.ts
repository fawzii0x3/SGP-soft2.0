import { EntitySchema, MixedList } from 'typeorm'
import User from './User'
import Order from './Order'
import Supplier from './Supplier'
import Brand from './Brand'
import Item from './Item'
import SoldItem from './SoldItem'

const entities = [User, Order, Supplier, Brand, Item,SoldItem] as MixedList<
  string | Function | EntitySchema<any>
>

export { User, Order, Supplier, Brand, Item ,SoldItem}

export default entities
