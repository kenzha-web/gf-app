"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('appConfig', function () { return ({
    enviroment: process.env.NODE_ENV || 'production',
    apiVersion: process.env.API_VERSION,
    awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME || 'smesi-news-images', // Имя Bucket
    awsRegion: process.env.AWS_REGION || 'eu-north-1', // Регион
    awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL, // CloudFront URL
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    mailHost: process.env.MAIL_HOST,
    smtpUsername: process.env.SMTP_USERNAME,
    smtpPassword: process.env.SMTP_PASSWORD,
}); });
