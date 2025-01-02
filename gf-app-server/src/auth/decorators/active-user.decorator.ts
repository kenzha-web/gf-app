import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ActiveUserData} from "../inteface/active-user-data.interface";
import { REQUEST_USER_KEY } from "../constants/auth.constants";

export const ActiveUser = createParamDecorator(
    (field: keyof ActiveUserData | undefined, ctx: ExecutionContext)=>{
        const request = ctx.switchToHttp().getRequest();
        console.log('Request User:', request[REQUEST_USER_KEY]);
        const user: ActiveUserData = request[REQUEST_USER_KEY];
        return field ? user?.[field] : user;
    },
);
