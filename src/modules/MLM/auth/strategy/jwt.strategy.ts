// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'your_secret_key',
        });
    }

    async validate(payload: any) {
        console.log('he;;;;lo',payload.sub);
        const user = await this.authService.validateUser(payload.sub);
        if (!user) {
            console.log('Invalid user');
            throw new UnauthorizedException();
        }
        console.log('User authenticated');
        return user;
    }
}
