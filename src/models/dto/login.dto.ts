import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString, Length, Matches, MinLength, } from 'class-validator';
import { errorMessage } from 'src/configs/errorMessage';
import { RoleType } from 'src/security';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10, {
        message: errorMessage.PHONE_VALID,
    })
    @ApiProperty()
    @IsString()
    // @Matches(/^(03|05|07|08|09)\d{8}$/, {
    //     message: "Mật khẩu không đúng định dạng"
    // })
    phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        enum: RoleType,
        default: RoleType.USER,
    })
    role: string;
}

export interface PayLoadToken {
    userId: number;
    role: string;
}
