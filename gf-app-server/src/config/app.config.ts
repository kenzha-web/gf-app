import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  enviroment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME, // Имя Bucket
  awsRegion: process.env.AWS_REGION || 'eu-north-1',
  awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  mailHost: process.env.MAIL_HOST,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
}));
