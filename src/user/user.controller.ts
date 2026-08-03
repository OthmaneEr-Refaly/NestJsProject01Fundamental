import { Controller, Get, Put, Post, Query, Param, Body } from '@nestjs/common';
import { filter } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('user')
export class UserController {
    
    @Get()
    getUsers(@Query('name') name:string ) {
        const users =  [{ id: 1, name: 'Othmane' }
            , { id: 2, name: 'Taha' }
            , { id: 3, name: 'Montasir' }
        ];

        if(name){
            return users.filter((user) => {
                return user.name.toLowerCase().includes(name.toLowerCase());
            });
        }

        return users;
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return {id, name: 'Othmane'};
    }

    @Post()
    creeateUser(@Body() CreateUserDto: CreateUserDto){
        return {data: CreateUserDto, message: 'User created successfully'};
    }

    @Put(':id')
    updateUser(@Param('id') id:string, @Body() UpdateUserDto: UpdateUserDto){
        return { data: UpdateUserDto, message: "User updated successfully"};
    }

}