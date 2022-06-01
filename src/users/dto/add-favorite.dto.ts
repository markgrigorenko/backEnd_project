import { ApiProperty } from "@nestjs/swagger";

export class AddFavoriteDto {
  @ApiProperty({example:'b6824041-e94f-4c57-ae5d-c280ec455d6e.jpg', description: 'Название изображения'})
  readonly image:string;

  @ApiProperty({example:'7', description: 'id пользователя, который добавляет изображение в избранное'})
  readonly userId: number;
}