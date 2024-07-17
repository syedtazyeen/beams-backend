// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/mongoose/models/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('create')
    async create(@Body() createUserDto: User): Promise<User> {
        return this.usersService.create(createUserDto);
    }
}
