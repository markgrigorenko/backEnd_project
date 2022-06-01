import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Post } from "./posts.model";



@Table({tableName: 'user_favorite', createdAt: false, updatedAt: false})
export class UserFavorite extends Model<UserFavorite> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Post)
  @Column({type: DataType.INTEGER})
  post_Id:number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  user_Id: number;

}