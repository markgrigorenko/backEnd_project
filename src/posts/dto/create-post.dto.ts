import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({example:'cat.jpg', description: 'Название изображения'})
  title: string;

  @ApiProperty({example:'Picture with cat', description: 'Описание изображения'})
  readonly content: string;

  @ApiProperty({example:'3', description: 'id человека, загружающего изображения'})
  readonly userId: number;
}