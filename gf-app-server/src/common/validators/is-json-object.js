"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidSpecifications = IsValidSpecifications;
var class_validator_1 = require("class-validator");
function IsValidSpecifications(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidSpecifications',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: function (value) {
                    if (typeof value !== 'object')
                        return false;
                    // Добавьте свои правила проверки
                    return true;
                },
                defaultMessage: function (args) {
                    return "".concat(args.property, " must be a valid JSON object with correct structure.");
                },
            },
        });
    };
}
