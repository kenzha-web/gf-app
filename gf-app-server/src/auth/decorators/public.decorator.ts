import { SetMetadata } from '@nestjs/common';

/**
 * Декоратор для публичных маршрутов (не требует авторизации)
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);