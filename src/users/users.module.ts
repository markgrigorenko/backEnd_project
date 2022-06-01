import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { Post } from "../posts/posts.model";
import { UserFavorite } from "../posts/user-favorite.model";
import { PostsService } from "../posts/posts.service";
import { PostsModule } from "../posts/posts.module";
import { FilesService } from "../files/files.service";
import { FilesModule } from "../files/files.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PostsService, FilesService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post, UserFavorite]),
    RolesModule, PostsModule, FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService, PostsService, FilesService
  ]

})
export class UsersModule {}
