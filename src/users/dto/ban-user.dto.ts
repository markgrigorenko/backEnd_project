import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class BanUserDto {
  @ApiProperty({example:'7', description: 'id пользователя, которого нужно забанить'})
  readonly userId: number;

  @ApiProperty({example:'За нарушение правил', description: 'Причина бана'})
  readonly banReason: string;
}