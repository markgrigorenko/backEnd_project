import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Post } from "./posts.model";
import { FilesModule } from "../files/files.module";
import { UserFavorite } from "./user-favorite.model";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post, UserFavorite]),
      FilesModule
  ],
  exports: [
    PostsService
  ]
})
export class PostsModule {}
