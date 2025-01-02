import { userRole } from 'src/users/enums/userRole.enum'

export interface ActiveUserData {
    sub: number;
    email: string;
    role: userRole;
}
