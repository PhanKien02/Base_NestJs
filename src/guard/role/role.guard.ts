import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IUser } from 'src/interface/iuser.interface';
import { CreateUserDto } from 'src/models/dto/create-user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const role = this.reflector.get<string>('role', context.getHandler());
        if (!role) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as IUser;

        return user && user.role && user.role === role;
    }
}
