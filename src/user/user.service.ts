import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User{
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UserService {
    constructor(private readonly logger: LoggerService) {}

    private users: User[] = [
        {id: 1, name: 'Othmane', email: 'othmane@gmail.com'},
        {id: 2, name: 'Taha', email: 'taha@gmail.com'},
        {id: 3, name: 'Montasir', email: 'montasir@gmail.com'},
    ];

    findAllUsers(): User[] {
        this.logger.log('Getting all users');
        return this.users;
    }

    findUserById(id: number): User {
        this.logger.log('Getting User by its Id');
        const user = this.users.find(user => user.id === id);
        if (!user) {
          throw new NotFoundException(`User ${id} not found`);
        }
        return user;
      }

    createUser(createUserDto: CreateUserDto) {
        this.logger.log('Creating a User');

        const duplicate = this.users.find(
            (user) =>
              user.name === createUserDto.name ||
              user.email === createUserDto.email,
          );
          
          if (duplicate) {
            throw new ConflictException('Name or email already exists');
          }
        
        const newUser: User = {
          id: this.users.length + 1,
          name: createUserDto.name,
          email: createUserDto.email,
        };
        this.users.push(newUser);
        return newUser;
      }

    updateUser( id :number, updateUserDto: UpdateUserDto){
        this.logger.log('Updating a User');

        const duplicate = this.users.find(
            (user) => user.name === updateUserDto.name,
            (user) => user.email === updateUserDto.email
        );

        if(duplicate)
        {
            throw new ConflictException('Name or email already exists'); 
        }

        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
          }
        Object.assign(user, updateUserDto);
        return { data: updateUserDto, message: "User updated successfully"};
    }

    deleteUser(id: number): User{
        this.logger.log("Enters deleteUser func");
        console.log(id);

        const userIndex = this.users.findIndex(user => user.id === id)
        if (userIndex === -1) {
            throw new NotFoundException(`User ${id} not found`);
          }

        console.log(userIndex);
        const userToBeDeleted = this.users[userIndex];

        this.users.splice(userIndex, 1);

        return userToBeDeleted;
    }
}
