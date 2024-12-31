import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

import configuration from 'src/configs/configuration';
import { LoginDto, PayLoadToken } from 'src/models/dto/login.dto';
import { UserService } from '@/service/user.service';
import { IUser } from '@/interface/iuser.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configuration().accessToken.accessTokenScrect,
        });
    }

    async validate(payLoad: PayLoadToken, done: VerifiedCallback): Promise<any> {
        const user = await this.userService.findOne({ id: payLoad.userId });

        if (!user) {
            return done(
                new UnauthorizedException({ message: 'Người dùng không tồn tại trong hệ thống' }),
                false,
            );
        }
        if (!user.isActive)
            return done(
                new ForbiddenException({ message: 'Tài khoản người dùng đã bị khoá' }),
                false,
            );

        return done(null, user);
    }
}
