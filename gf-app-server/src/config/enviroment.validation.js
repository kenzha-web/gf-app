"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
exports.default = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'test', 'production', 'staging')
        .default('development'),
    // Database Configuration
    DATABASE_PORT: Joi.number().port().default(5432),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_SYNC: Joi.boolean().default(false),
    DATABASE_AUTOLOAD: Joi.boolean().default(true),
    // API and App Configuration
    PROFILE_API_KEY: Joi.string().required(),
    API_VERSION: Joi.string().default('0.1.1'),
    // JWT Configuration
    JWT_SECRET: Joi.string().required(),
    JWT_TOKEN_AUDIENCE: Joi.string().required(),
    JWT_TOKEN_ISSUER: Joi.string().required(),
    JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
    JWT_REFRESH_TOKEN_TTL: Joi.number().required(),
    // AWS Configuration
    AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
    AWS_REGION: Joi.string().default('eu-north-1'),
    AWS_CLOUDFRONT_URL: Joi.string().uri().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    // Mail Service Configuration
    MAIL_HOST: Joi.string().hostname().required(),
    SMTP_USERNAME: Joi.string().email().required(),
    SMTP_PASSWORD: Joi.string().required(),
});
