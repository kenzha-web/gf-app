import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsValidSpecifications(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidSpecifications',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'object') return false;
          // Добавьте свои правила проверки
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid JSON object with correct structure.`;
        },
      },
    });
  };
}
