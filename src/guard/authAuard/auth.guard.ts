
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import configuration from 'src/configs/configuration';
import { errorMessage } from 'src/configs/errorMessage';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) throw new UnauthorizedException("Please authenticate");
        try {
            const payload = this.jwtService.verify(
                token,
                {
                    algorithms: ["HS256"],
                    secret: configuration().accessToken.accessTokenScrect,
                },
            );

            request['userId'] = payload.id;
            request['role'] = payload.role;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
