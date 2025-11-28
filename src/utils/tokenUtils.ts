import { CognitoJwtVerifier } from 'aws-jwt-verify/cognito-verifier';

import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authMiddleware';
import { config } from '../config/env';

export const getAccessToken = (req: AuthRequest): string | null => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;
  return token;
};

export const mobileClientTokenVerifier = CognitoJwtVerifier.create({
  userPoolId: config.cognitoUserPoolId,
  tokenUse: 'access',
  clientId: config.mobileClientId,
});
export const webClientTokenVerifier = CognitoJwtVerifier.create({
  userPoolId: config.cognitoUserPoolId,
  tokenUse: 'access',
  clientId: config.webClientId,
});


export const getSubFromAccessToken = (token:string):string|undefined=>{
const payload = jwt.decode(token) as any;
const sub = payload?.sub ;
return sub;
}

