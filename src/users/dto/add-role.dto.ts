import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({example:'MANAGER', description: 'Название роли'})
  @IsString({message:"Должно быть строкой"})
  readonly value: string;

  @ApiProperty({example:'7', description: 'id пользователя, которому нужно добавить роль'})
  @IsNumber({}, {message:"Должно быть числом"})
  readonly userId: number;
}