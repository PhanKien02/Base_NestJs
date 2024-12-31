import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import configuration from 'src/configs/configuration';
import { LoginDto } from 'src/models/dto/login.dto';
import { UserService } from '@/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configuration().accessToken.accessTokenScrect,
        });
    }

    async validate(payload: LoginDto, done: VerifiedCallback): Promise<any> {
        const user = await this.userService.validateUser(payload);
        if (!user) {
            return done(new UnauthorizedException({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác' }), false);
        }

        return done(null, user);
    }
}
