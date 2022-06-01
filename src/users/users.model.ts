import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Post } from "../posts/posts.model";
import { UserFavorite } from "../posts/user-favorite.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {


  @ApiProperty({example:'1', description: 'Уникальный id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example:'user@gmail.com', description: 'Почта'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email:string;

  @ApiProperty({example:'12345678', description: 'Пароль'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({example:'true', description: 'Забанен пользователь или нет'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;


  @ApiProperty({example:'За нарушение правил', description: 'Причина блокировки'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason:string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @BelongsToMany(() => Post, () => UserFavorite)
  posts: Post[]

/*  @HasMany(() => Post)
    posts: Post[];*/
}