import { ObjectType,Field,ID } from "type-graphql";
import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item";

@ObjectType()
@Entity()
export default class Brand extends BaseEntity{
  @Field(()=>ID)
  @PrimaryGeneratedColumn("uuid")
  public id!: string;


  @Field(()=>String)
  @Index()
  @Column({ type: 'varchar', length: 255 })
  public name!:string

  @OneToMany(()=>Item,(item)=>item.brand)
  public items?:Item[]
}