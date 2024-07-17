import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' }); 
    }

    // async validate(email: string, password: string) {
    //     console.log(`Validating email: ${email}, password: ${password}`);
    //     const user = await this.authService.authenticateUser(email, password);
    //     if (!user) {
    //         console.log('Invalid user');
    //         throw new UnauthorizedException();
    //     }
    //     console.log('User authenticated');
    //     return user;
    // }
    
}

