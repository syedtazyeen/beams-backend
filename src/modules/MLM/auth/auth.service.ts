// src/auth/auth.service.ts
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/modules/MLM/auth/dto/login.dto';
import { RegisterDto } from 'src/modules/MLM/auth/dto/register.dto';
import * as bcrypt from 'bcryptjs'
import { UsersService } from 'src/modules/LLM/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(loginDto.email);
    if (!user) {
      throw new NotFoundException();
    }
    if (user && await this.comparePasswords(loginDto.password, user.password)) {
      return this.generateToken(user.email, user._id as string);
    }
    throw new UnauthorizedException
  }


  async validateUser(id: string): Promise<any> {
    const user = await this.usersService.findById(id);
    if (!user) throw new UnauthorizedException()
    const { password, ...validatedUser } = user._doc
    return validatedUser;
  }


  async register(registerDto: RegisterDto): Promise<any> {
    try {
      const user = {
        email: registerDto.email,
        password: await this.hashPassword(registerDto.password),
        username: registerDto.username,
      }
      return await this.usersService.create(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  private generateToken(email: string, sub: string) {
    const payload = { email: email, sub: sub };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };

  private comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  };
}
