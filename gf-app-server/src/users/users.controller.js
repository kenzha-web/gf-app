"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var auth_decorator_1 = require("../auth/decorators/auth.decorator");
var auth_type_enum_1 = require("../auth/enums/auth-type.enum");
var UsersController = function () {
    var _classDecorators = [(0, common_1.Controller)('users'), (0, swagger_1.ApiTags)('Пользователи')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getUsers_decorators;
    var _createUsers_decorators;
    var _createManyUsers_decorators;
    var _patchUser_decorators;
    var UsersController = _classThis = /** @class */ (function () {
        function UsersController_1(usersService) {
            this.usersService = (__runInitializers(this, _instanceExtraInitializers), usersService);
        }
        UsersController_1.prototype.getUsers = function (getUsersParamDto, limit, page) {
            return this.usersService.findAll(getUsersParamDto, limit, page);
        };
        UsersController_1.prototype.createUsers = function (createUserDto) {
            return this.usersService.createUser(createUserDto);
        };
        UsersController_1.prototype.createManyUsers = function (createManyUsersDto) {
            var users = createManyUsersDto.users;
            return this.usersService.createMany(users);
        };
        UsersController_1.prototype.patchUser = function (patchUserDto) {
            return this.usersService.updateUser(patchUserDto);
        };
        return UsersController_1;
    }());
    __setFunctionName(_classThis, "UsersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getUsers_decorators = [(0, common_1.Get)('/:id?'), (0, swagger_1.ApiOperation)({
                summary: 'Получить пользователей',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Пользователи успешно получены на основе запроса',
            }), (0, swagger_1.ApiQuery)({
                name: 'limit',
                type: 'number',
                required: false,
                description: 'Количество записей, возвращаемых за один запрос',
                example: 10,
            }), (0, swagger_1.ApiQuery)({
                name: 'page',
                type: 'number',
                required: false,
                description: 'Номер страницы, которую вы хотите получить',
                example: 1,
            })];
        _createUsers_decorators = [(0, common_1.Post)(), (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.None), (0, swagger_1.ApiOperation)({
                summary: 'Регистрация нового пользователя',
            }), (0, swagger_1.ApiResponse)({
                status: 201,
                description: 'Пользователь успешно зарегистрирован',
            }), (0, swagger_1.ApiResponse)({
                status: 400,
                description: 'Ошибка валидации или другой запрос',
            }), (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor)];
        _createManyUsers_decorators = [(0, common_1.Post)('create-many'), (0, swagger_1.ApiOperation)({
                summary: 'Создать нескольких пользователей',
            }), (0, swagger_1.ApiResponse)({
                status: 201,
                description: 'Пользователи успешно созданы',
            })];
        _patchUser_decorators = [(0, common_1.Patch)(), (0, swagger_1.ApiOperation)({
                summary: 'Обновление информации о пользователе',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Пользователь успешно обновлен',
            })];
        __esDecorate(_classThis, null, _getUsers_decorators, { kind: "method", name: "getUsers", static: false, private: false, access: { has: function (obj) { return "getUsers" in obj; }, get: function (obj) { return obj.getUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createUsers_decorators, { kind: "method", name: "createUsers", static: false, private: false, access: { has: function (obj) { return "createUsers" in obj; }, get: function (obj) { return obj.createUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createManyUsers_decorators, { kind: "method", name: "createManyUsers", static: false, private: false, access: { has: function (obj) { return "createManyUsers" in obj; }, get: function (obj) { return obj.createManyUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _patchUser_decorators, { kind: "method", name: "patchUser", static: false, private: false, access: { has: function (obj) { return "patchUser" in obj; }, get: function (obj) { return obj.patchUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersController = _classThis;
}();
exports.UsersController = UsersController;
