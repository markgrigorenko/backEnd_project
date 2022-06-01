import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { BanUserDto } from "./dto/ban-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { AddFavoriteDto } from "./dto/add-favorite.dto";
import { PostsService } from "../posts/posts.service";
import { request } from "express";
import { where } from "sequelize";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService, private postService: PostsService) {}

  async createUser(dto:CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("ADMIN")
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;

  }

  async getAllUsers(req) {
    let limit = req.limit
    let page = req.page || 1

    let offset = page * limit - limit

    const users = await this.userRepository.findAndCountAll({limit, offset, include: {all:true}});
    /*const users = await this.userRepository.findAll({include: {all: true}});*/
    return users;
  }

  async getUserByEmail(email:string) {
    const user = await this.userRepository.findOne({where: {email}, include: {all:true}})
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if(!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;

  }

  async addToFavorites(dto:AddFavoriteDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const post = await this.postService.getPostByValue(dto.image);

    if (post && user) {
      await user.$add('posts', [post.id]);
      return dto;
    }
    throw new HttpException('Пользователь или изображение не найдены', HttpStatus.NOT_FOUND);
  }
}
