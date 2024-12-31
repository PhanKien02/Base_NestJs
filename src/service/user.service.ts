import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hashSync } from 'bcrypt';
import { genKeyActive } from '@/utils/gennerate-key';
import { IUser } from '@/interface/iuser.interface';
import { InsertResult } from 'typeorm';
import { errorMessage } from '@/configs/errorMessage';
import { JwtService } from '@nestjs/jwt';
import configuration from '@/configs/configuration';
import { UserRepository } from '@/repository/user.repository';
import { CreateUserDto } from '@/models/dto/create-user.dto';
import { UserDto } from '@/models/dto/user.dto';
import { LoginDto } from '@/models/dto/login.dto';


@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) { }
    async register(createUserDto: CreateUserDto, userId: number): Promise<InsertResult> {

        const validateEmail = await this.userRepository.findOneBy({ phone: createUserDto.phone, role: createUserDto.role })
        if (validateEmail) {
            throw new BadRequestException(errorMessage.PHONE_EXITS)
        }
        const newUser = await this.userRepository.insert({ ...createUserDto, activeKey: genKeyActive(), isActive: false, password: hashSync(createUserDto.password, 10), created_by: userId })
        return newUser
    }

    async findAll({ page = 1, limit = 10, sortBy, where }): Promise<IUser[]> {
        const users = await this.userRepository.find({
            where: where ? where : {}, skip: ((page - 1) * limit), take: limit, order: sortBy ? sortBy : {}, select: {
                fullName: true,
                email: true, id: true, isActive: true,
                deleted_at: true, created_at: true, created_by: true
            }
        });

        return users
    }

    findOne(where: Object): Promise<IUser> {
        return this.userRepository.findOneBy(where)
    }

    async update(id: number, updateUserDto: UserDto) {
        const user = await this.userRepository.update(updateUserDto, { id })
        return user
    }

    async remove(id: number) {
        return await this.userRepository.update({ deleted_at: new Date() }, { id })
    }


    async login(payLoad: LoginDto) {
        const user = await this.validateUser(payLoad);
        const accessToken = this.jwtService.sign({
            id: user.id,
            role: user.role
        }, {
            algorithm: "HS256",
            secret: configuration().accessToken.accessTokenScrect,
            expiresIn: configuration().accessToken.expiresIn
        });

        const now = new Date();

        const expires = new Date(now);
        const refreshToken = this.jwtService.sign({
            id: user.id,
        }, {
            algorithm: "HS512",
            secret: configuration().refreshToken.accessTokenScrect,
            expiresIn: configuration().refreshToken.expiresIn
        });

        return {
            user,
            accessToken,
            refreshToken,
            expires: expires.setSeconds(expires.getSeconds() + parseInt(configuration().accessToken.expiresIn))
        }
    }
    async validateUser(payLoad: LoginDto): Promise<Omit<IUser, 'password' | 'activeKey' | 'resetKey'>> {
        const user = await this.userRepository.findOneBy({ phone: payLoad.phone, role: payLoad.role });
        if (!user)
            throw new BadRequestException(HttpStatus.BAD_REQUEST, errorMessage.LOGIN_ERROR);
        if (!compare
            (payLoad.password, user.password))
            throw new BadRequestException(HttpStatus.BAD_REQUEST, errorMessage.LOGIN_ERROR);
        const { password, activeKey, resetKey, ...rest } = user
        return rest
    }

}

