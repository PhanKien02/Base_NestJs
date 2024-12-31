import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../../models/enum/role-type';

export const Role = (role: RoleType[]): any => SetMetadata('role', role);
