import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Роли пользователей')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {
  }

  @ApiOperation({summary: 'Создание роли'})
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({summary: 'Получение роли по названию'})
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
