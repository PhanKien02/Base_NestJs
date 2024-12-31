import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    fullName: string;

    isActive: boolean;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    avatarUrl?: string;

    @ApiProperty()
    citizenIdentificationNumber: string;

    @ApiProperty()
    citizenIDFrontUrl: string;

    @ApiProperty()
    citizenIDFrontBack: string;

    role: string;
}
