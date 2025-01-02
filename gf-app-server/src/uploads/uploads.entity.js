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
exports.Upload = void 0;
var typeorm_1 = require("typeorm");
var file_types_enum_1 = require("./enums/file-types.enum");
var Upload = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _path_decorators;
    var _path_initializers = [];
    var _path_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _mime_decorators;
    var _mime_initializers = [];
    var _mime_extraInitializers = [];
    var _size_decorators;
    var _size_initializers = [];
    var _size_extraInitializers = [];
    var _createDate_decorators;
    var _createDate_initializers = [];
    var _createDate_extraInitializers = [];
    var _updateDate_decorators;
    var _updateDate_initializers = [];
    var _updateDate_extraInitializers = [];
    var Upload = _classThis = /** @class */ (function () {
        function Upload_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.path = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _path_initializers, void 0));
            this.type = (__runInitializers(this, _path_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.mime = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _mime_initializers, void 0));
            this.size = (__runInitializers(this, _mime_extraInitializers), __runInitializers(this, _size_initializers, void 0));
            this.createDate = (__runInitializers(this, _size_extraInitializers), __runInitializers(this, _createDate_initializers, void 0));
            this.updateDate = (__runInitializers(this, _createDate_extraInitializers), __runInitializers(this, _updateDate_initializers, void 0));
            __runInitializers(this, _updateDate_extraInitializers);
        }
        return Upload_1;
    }());
    __setFunctionName(_classThis, "Upload");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _name_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                length: 1024,
                nullable: false,
            })];
        _path_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                length: 1024,
                nullable: false,
            })];
        _type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: file_types_enum_1.fileTypes,
                default: file_types_enum_1.fileTypes.IMAGE,
                nullable: false,
            })];
        _mime_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                length: 128,
                nullable: false,
            })];
        _size_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                length: 1024,
                nullable: false,
            })];
        _createDate_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updateDate_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _path_decorators, { kind: "field", name: "path", static: false, private: false, access: { has: function (obj) { return "path" in obj; }, get: function (obj) { return obj.path; }, set: function (obj, value) { obj.path = value; } }, metadata: _metadata }, _path_initializers, _path_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _mime_decorators, { kind: "field", name: "mime", static: false, private: false, access: { has: function (obj) { return "mime" in obj; }, get: function (obj) { return obj.mime; }, set: function (obj, value) { obj.mime = value; } }, metadata: _metadata }, _mime_initializers, _mime_extraInitializers);
        __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: function (obj) { return "size" in obj; }, get: function (obj) { return obj.size; }, set: function (obj, value) { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
        __esDecorate(null, null, _createDate_decorators, { kind: "field", name: "createDate", static: false, private: false, access: { has: function (obj) { return "createDate" in obj; }, get: function (obj) { return obj.createDate; }, set: function (obj, value) { obj.createDate = value; } }, metadata: _metadata }, _createDate_initializers, _createDate_extraInitializers);
        __esDecorate(null, null, _updateDate_decorators, { kind: "field", name: "updateDate", static: false, private: false, access: { has: function (obj) { return "updateDate" in obj; }, get: function (obj) { return obj.updateDate; }, set: function (obj, value) { obj.updateDate = value; } }, metadata: _metadata }, _updateDate_initializers, _updateDate_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Upload = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Upload = _classThis;
}();
exports.Upload = Upload;
