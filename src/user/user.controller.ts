import { ParseIntPipe, Controller, Get, 
    Put, Post, Query, Param, 
    Body, Delete, UseGuards } from '@nestjs/common';
import { filter } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './user.service';
import { LoggerService } from './user.logger';
import { RoleGuard } from 'src/guards/role.guard';



@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService, private readonly logger: LoggerService) {}
    
    @Get()
    getUsers(): User[] {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findUserById(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto){
        return this.userService.updateUser(Number(id), updateUserDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    deleteUserById(@Param('id') id: number){
        this.logger.log("debugger");

        return this.userService.deleteUser(Number(id));
    }

}
