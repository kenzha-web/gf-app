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
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var users_controller_1 = require("./users.controller");
var users_service_1 = require("./providers/users.service");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./user.entity");
var config_1 = require("@nestjs/config");
var users_create_many_provider_1 = require("./providers/users-create-many.provider");
var create_user_provider_1 = require("./providers/create-user.provider");
var profile_config_1 = require("./config/profile.config");
var auth_module_1 = require("../auth/auth.module");
var find_one_user_by_email_provider_1 = require("./providers/find-one-user-by-email.provider");
var find_one_by_google_id_provider_1 = require("./providers/find-one-by-google-id.provider");
var create_google_user_provider_1 = require("./providers/create-google-user.provider");
var mail_module_1 = require("../mail/mail.module");
var UsersModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            controllers: [users_controller_1.UsersController],
            providers: [
                users_service_1.UsersService,
                users_create_many_provider_1.UsersCreateManyProvider,
                create_user_provider_1.CreateUserProvider,
                find_one_user_by_email_provider_1.FindOneUserByEmailProvider,
                find_one_by_google_id_provider_1.FindOneByGoogleIdProvider,
                create_google_user_provider_1.CreateGoogleUserProvider,
            ],
            imports: [
                (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; }),
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
                config_1.ConfigModule.forFeature(profile_config_1.default),
                mail_module_1.MailModule, // Добавьте это
            ],
            exports: [users_service_1.UsersService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersModule = _classThis = /** @class */ (function () {
        function UsersModule_1() {
        }
        return UsersModule_1;
    }());
    __setFunctionName(_classThis, "UsersModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersModule = _classThis;
}();
exports.UsersModule = UsersModule;
