"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_controller_1 = require("./auth.controller");
var auth_service_1 = require("./providers/auth.service");
var users_module_1 = require("../users/users.module");
var hashing_provider_1 = require("./providers/hashing.provider");
var bcrypt_provider_1 = require("./providers/bcrypt.provider");
var sign_in_provider_1 = require("./providers/sign-in.provider");
var config_1 = require("@nestjs/config");
var jwt_config_1 = require("./config/jwt.config");
var jwt_1 = require("@nestjs/jwt");
var access_token_guard_1 = require("./guards/access-token/access-token.guard");
var generate_tokens_provider_1 = require("./providers/generate-tokens.provider");
var refresh_tokens_provider_1 = require("./providers/refresh-tokens.provider");
var google_authentication_controller_1 = require("./social/google-authentication.controller");
var google_authentication_service_1 = require("./social/providers/google-authentication.service");
var categories_module_1 = require("../categories/categories.module");
var products_module_1 = require("../products/products.module");
var AuthModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            controllers: [auth_controller_1.AuthController, google_authentication_controller_1.GoogleAuthenticationController],
            imports: [
                config_1.ConfigModule.forFeature(jwt_config_1.default),
                (0, common_1.forwardRef)(function () { return users_module_1.UsersModule; }),
                (0, common_1.forwardRef)(function () { return categories_module_1.CategoriesModule; }),
                (0, common_1.forwardRef)(function () { return products_module_1.ProductsModule; }),
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        secret: configService.get('JWT_SECRET'),
                        signOptions: {
                            expiresIn: "".concat(configService.get('JWT_ACCESS_TOKEN_TTL'), "s"),
                            audience: configService.get('JWT_TOKEN_AUDIENCE'),
                            issuer: configService.get('JWT_TOKEN_ISSUER'),
                        },
                    }); },
                }),
            ],
            providers: [
                auth_service_1.AuthService,
                {
                    provide: hashing_provider_1.HashingProvider,
                    useClass: bcrypt_provider_1.BcryptProvider,
                },
                sign_in_provider_1.SignInProvider,
                access_token_guard_1.AccessTokenGuard,
                generate_tokens_provider_1.GenerateTokensProvider,
                refresh_tokens_provider_1.RefreshTokensProvider,
                google_authentication_service_1.GoogleAuthenticationService,
            ],
            exports: [
                auth_service_1.AuthService,
                hashing_provider_1.HashingProvider,
                access_token_guard_1.AccessTokenGuard,
                jwt_1.JwtModule,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthModule = _classThis = /** @class */ (function () {
        function AuthModule_1() {
        }
        return AuthModule_1;
    }());
    __setFunctionName(_classThis, "AuthModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthModule = _classThis;
}();
exports.AuthModule = AuthModule;
