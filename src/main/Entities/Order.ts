import { ObjectType,Field,ID } from "type-graphql";
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import SoldItem from "./SoldItem";

@ObjectType()
@Entity()
export default class Order extends BaseEntity{
  @Field(()=>ID)
  @PrimaryGeneratedColumn({type:"integer"})
  id!: number;

  @Field(()=>String)
  @CreateDateColumn({ type: 'date' })
  created_date!: Date



  
  @Field(()=>User,{nullable:true})
  @ManyToOne(() => User, (user) => user.orders,{nullable:true})
  public seller?: User
  
  @Field(()=>[SoldItem])
  @OneToMany(()=>SoldItem,(soldItem)=>soldItem.order)
  soldItems:SoldItem[]
}