import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/modules/MLM/auth/dto/login.dto';
import { RegisterDto } from 'src/modules/MLM/auth/dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    async create(@Body() loginDto: LoginDto): Promise<any> {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() createUserDto: RegisterDto): Promise<any> {
        return this.authService.register(createUserDto);
    }
}
