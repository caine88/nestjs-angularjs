import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  //async registerUser(@Res() response, @Body() user: User) {
  async registerUser(@Body() user: User) {
    //  const newUser = await this.userService.register(user);
    //   return response.status(HttpStatus.CREATED).json({
    //       newUser
    //   })
    return await this.userService.register(user);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    //   const users = await this.userService.getUsers();
    //   console.log("Users2=", typeof(users));
    //   console.log("Users2=", users);
    //   return response.status(HttpStatus.OK).json({
    //       users
    //   })
    return await this.userService.getUsers();
  }

  @Get('/:id')
  async findById(@Param('id') id) {
    //  const user = await this.userService.getUserById(id);
    //   return response.status(HttpStatus.OK).json({
    //       user
    //   })
    return await this.userService.getUserById(id);
  }

  @Patch('/:id/update')
  async update(
      @Param('id') id,
      @Body() user: User) {
      //const updatedUser = await this.userService.update(id, user);
      return await this.userService.update(id, user);
  }

  @Delete('/:id/delete')
  async delete(@Param('id') id) {
    //   const deletedUser = await this.userService.delete(id);
    //   return response.status(HttpStatus.OK).json({
    //     deletedUser
    //   })
      return await this.userService.delete(id);
  }
}
