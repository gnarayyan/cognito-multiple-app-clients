import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  awsRegion: process.env.AWS_REGION || 'us-east-1',
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID || '',
  webClientId: process.env.WEB_CLIENT_ID || '',
  webClientSecret: process.env.WEB_CLIENT_SECRET || '',
  mobileClientId: process.env.MOBILE_CLIENT_ID || '',
  //   mobileClientSecret: process.env.MOBILE_CLIENT_SECRET || '',
};

if (
  !config.cognitoUserPoolId ||
  !config.webClientId ||
  !config.mobileClientId
) {
  console.warn('WARNING: Cognito configuration is missing in .env file');
}
