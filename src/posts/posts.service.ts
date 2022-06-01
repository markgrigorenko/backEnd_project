import { Injectable } from '@nestjs/common';
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { FilesService } from "../files/files.service";

const sharp = require("sharp");
const fs = require("fs");

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postRepository: typeof Post,
              private fileService: FilesService) {}


  async create(dto: CreatePostDto, image:any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({...dto, image: fileName})

    let originaldtotitle = dto.title

    /*1920x1080*/
    dto.title = `${dto.title}_fullHD`
    await sharp(image.buffer)
      .resize({ width: 1920, height: 1080 })
      .toBuffer()
      .then(data => {
        image.buffer = data
      });
    const fileFHD = await this.fileService.createFile(image);
    const postFHD = await this.postRepository.create({...dto, imageFullHD: fileFHD})

    /*1366x768*/
    dto.title= originaldtotitle
    dto.title = `${dto.title}_HD`
    await sharp(image.buffer)
      .resize({ width: 1366, height: 768})
      .toBuffer()
      .then(data => {
        image.buffer = data
      });
    const fileHD = await this.fileService.createFile(image);
    const postHD = await this.postRepository.create({...dto, imageHD: fileHD})

    /*/3840 Х 2160/*/
    dto.title= originaldtotitle
    dto.title = `${dto.title}_4K`
    await sharp(image.buffer)
      .resize({ width: 3840, height: 2160})
      .toBuffer()
      .then(data => {
        image.buffer = data
      });
    const file4K = await this.fileService.createFile(image);
    const post4K = await this.postRepository.create({...dto, image4k: file4K})

    /*/2048×1080/*/
    dto.title= originaldtotitle
    dto.title = `${dto.title}_2K`
    await sharp(image.buffer)
      .resize({ width: 2048, height: 1080})
      .toBuffer()
      .then(data => {
        image.buffer = data
      });
    const file2K = await this.fileService.createFile(image);
    const post2K = await this.postRepository.create({...dto, image2k: file2K})

    return post;
  }


  async getPostByValue(image: string) {
    const post = await this.postRepository.findOne({where: {image}})
    return post;
  }
}
