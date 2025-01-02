"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveUser = void 0;
var common_1 = require("@nestjs/common");
var auth_constants_1 = require("../constants/auth.constants");
exports.ActiveUser = (0, common_1.createParamDecorator)(function (field, ctx) {
    var request = ctx.switchToHttp().getRequest();
    var user = request[auth_constants_1.REQUEST_USER_KEY];
    return field ? user === null || user === void 0 ? void 0 : user[field] : user;
});
