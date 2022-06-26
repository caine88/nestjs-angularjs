import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() user: User) {
    return await this.userService.register(user);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Patch('/:id/update')
  async update(
    @Param('id') id,
    @Body() user: User) {
    return await this.userService.update(id, user);
  }

  @Delete('/:id/delete')
  async delete(@Param('id') id) {
    return await this.userService.delete(id);
  }
}
