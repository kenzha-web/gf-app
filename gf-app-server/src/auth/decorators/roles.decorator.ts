import { SetMetadata } from '@nestjs/common';
import { userRole } from 'src/users/enums/userRole.enum';

/**
 * Декоратор для ограничения доступа на основе ролей
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: userRole[]) => SetMetadata(ROLES_KEY, roles);