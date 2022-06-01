import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Взаимодействие с изображениями')
@Controller('posts')
export class PostsController {

  constructor(private postService: PostsService) {
  }

  @ApiOperation({summary: 'Загрузка изображения на сервер'})
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto,
             @UploadedFile() image) {
     return this.postService.create(dto, image)
  }

  @ApiOperation({summary: 'Получение изображения по навзанию'})
  @Get('/:image')
  getByValue(@Param('image') image: string) {
    return this.postService.getPostByValue(image);

  }



  /*@Post('/addToFavorite')
  @UseInterceptors(FileInterceptor('image'))
  login(@Body() dto: CreatePostDto,
        @UploadedFile() image) {
    return this.postService.addToFavorite(dto, image)

  }*/

}
