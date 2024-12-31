import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";
import { errorMessage } from "src/configs/errorMessage";
import { RoleType } from "src/security";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10, { message: errorMessage.PHONE_VALID })
    @ApiProperty({ default: '0374824645' })
    @Transform(({ value }) => value.trim()) // Xóa khoảng trắng thừa
    phone: string;

    @MinLength(6, {
        message: "Mật khẩu cần tối thiểu 6 ký tự"
    })
    @IsNotEmpty()
    @Transform(({ value }) => value.trim()) // Xóa khoảng trắng thừa
    @IsString()
    @ApiProperty({
        default: "admin"
    }
    )
    password: string;

    @IsString()
    @ApiProperty({
        default: "admin"
    })
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase()) // Chuyển chữ hoa thành chữ thường
    @ApiProperty({
        enum: RoleType,
        default: RoleType.USER
    })
    role: string
}