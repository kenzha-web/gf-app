"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var common_1 = require("@nestjs/common");
var auth_constants_1 = require("../constants/auth.constants");
var Auth = function () {
    var authTypes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        authTypes[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)(auth_constants_1.AUTH_TYPE_KEY, authTypes);
};
exports.Auth = Auth;
