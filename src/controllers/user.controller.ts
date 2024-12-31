import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, UseGuards, Req, Logger, Put } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@/guard/authAuard/auth.guard';
import { IResponse } from '@/interface/response.interface';
import { IUser } from '@/interface/iuser.interface';
import { InsertResult } from 'typeorm';
import { Role } from '@/decorators/roles.decorator';
import { RolesGuard, RoleType } from '@/security/index';
import { UserService } from '@/service/user.service';
import { CreateUserDto } from '@/models/dto/create-user.dto';
import { UserDto } from '@/models/dto/user.dto';
import { LoginDto } from '@/models/dto/login.dto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    private readonly logger = new Logger(UserService.name)

    @HttpCode(HttpStatus.OK)
    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Req() req: Request): Promise<IResponse<InsertResult>> {
        const result = await this.userService.register(createUserDto, req["userId"]);
        this.logger.log("Create new User Success");
        return {
            data: result,
            message: "Create new User Success"
        }
    }


    @UseGuards(AuthGuard, RolesGuard) // Bảo vệ bằng JWT
    @Role(RoleType.ADMIN)
    @Get()
    async findAll(@Query() query): Promise<IResponse<IUser[]>> {
        const { page, limit, sortBy, filter } = query
        const users = await this.userService.findAll({ limit, page, sortBy, where: filter });
        this.logger.log("Get all user success");
        return {
            data: users,
            message: "Get all user success"
        }
    }

    @Get()
    async findOne(@Body() where: IUser): Promise<IResponse<IUser>> {
        const user = await this.userService.findOne(where);
        return {
            data: user,
            message: "find User by id success"
        }
    }

    @UseGuards(AuthGuard) // Bảo vệ bằng JWT
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UserDto): Promise<IResponse<unknown>> {
        const result = await this.userService.update(+id, updateUserDto);
        return {
            data: result,
            message: "Update user success"
        }
    }

    @UseGuards(AuthGuard) // Bảo vệ bằng JWT
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.remove(+id);
    }

    @Post("/login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() login: LoginDto): Promise<IResponse<any>> {
        const data = await this.userService.login(login)
        return {
            data,
            message: "Login success"
        }
    }
}


