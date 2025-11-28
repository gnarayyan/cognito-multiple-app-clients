import { Request, Response, NextFunction } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { config } from '../config/env';
import { ClientType, getClientType } from '../utils/getClientType';
import {
  getAccessToken,
  mobileClientTokenVerifier,
  webClientTokenVerifier,
} from '../utils/tokenUtils';

// Create a verifier that accepts tokens from either the Web or Mobile client

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = getAccessToken(req);
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const clientType = getClientType(req);

    if (clientType === ClientType.mobile) {
      req.user = await mobileClientTokenVerifier.verify(token);
    } else {
      req.user = await webClientTokenVerifier.verify(token);
    }

    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
