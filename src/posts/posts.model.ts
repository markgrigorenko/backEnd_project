import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { User } from "../users/users.model";
import { UserFavorite } from "./user-favorite.model";

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
  image4k: string;
  image2k: string;
  imageFullHD: string;
  imageHD: string;

}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {

  @ApiProperty({example:'1', description: 'Уникальный id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example:'catImage', description: 'Название изображения'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title:string;

  @ApiProperty({example:'Image With cat', description: 'Описание изображения'})
  @Column({type: DataType.STRING, allowNull: false})
  content: string;

  @ApiProperty({example:'cat.png', description: 'Файл с изображением'})
  @Column({type:DataType.STRING})
  image: string;

  @Column({type:DataType.STRING})
  image4k: string;

  @Column({type:DataType.STRING})
  image2k: string;

  @Column({type:DataType.STRING})
  imageFullHD: string;

  @Column({type:DataType.STRING})
  imageHD: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsToMany(() => User, () => UserFavorite)
  users: User[]
}