import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/security';

export const Role = (role: RoleType): any => SetMetadata('role', role);
