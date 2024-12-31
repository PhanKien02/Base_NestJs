import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '@/security/passport.jwt.strategy';
import { User } from '@/models/user.entity';
import { UserController } from '@/controllers/user.controller';
import { UserService } from '@/service/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UserRepository, JwtService, JwtStrategy],
    exports: [UserService, UserRepository]
})
export class UserModule { }
