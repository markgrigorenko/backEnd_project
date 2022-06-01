import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example:'user@gmail.com', description: 'Почта'})
  @IsString({message:'Должно быть строкой'})
  @IsEmail({},{message: "Некорректный e-mail"})
  readonly email: string;

  @ApiProperty({example:'12345678', description: 'Пароль'})
  @IsString({message:'Должно быть строкой'})
  @Length(4,16,{message:'Пароль должен быть не меньше 4-ёх и не больше 16-ти символов'})
  readonly password: string;
}