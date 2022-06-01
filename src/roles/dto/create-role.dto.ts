import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({example:'MANAGER', description: 'Название новой роли'})
  readonly value: string;

  @ApiProperty({example:'Менеджер', description: 'Описание новой роли'})
  readonly description: string;
}