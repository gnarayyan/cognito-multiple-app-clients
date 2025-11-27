import { Request, Response } from 'express';
import * as cognitoService from '../services/cognitoService';
import { ClientType } from '../lib/types';

const getClientType = (req: Request): ClientType => {
  const type = req.headers['x-client-type'];
  if (type === 'mobile') return 'mobile';
  return 'web';
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, name } = req.body;
    const clientType = getClientType(req);
    const result = await cognitoService.signUp(
      clientType,
      username,
      password,
      name
    );
    res.json({ message: 'Signup successful', result });
  } catch (error: any) {
    res.status(400).json({ message: 'Signup failed', error: error.message });
  }
};

export const confirmSignup = async (req: Request, res: Response) => {
  try {
    const { username, code } = req.body;
    const clientType = getClientType(req);
    const result = await cognitoService.confirmSignUp(
      clientType,
      username,
      code
    );
    res.json({ message: 'Confirmation successful', result });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: 'Confirmation failed', error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const clientType = getClientType(req);
    const result = await cognitoService.login(clientType, username, password);
    res.json({
      message: 'Login successful',
      accessToken: result.AuthenticationResult?.AccessToken,
      idToken: result.AuthenticationResult?.IdToken,
      refreshToken: result.AuthenticationResult?.RefreshToken,
    });
  } catch (error: any) {
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken, username } = req.body;
    const clientType = getClientType(req);
    const result = await cognitoService.refreshToken(
      clientType,
      refreshToken,
      username
    );
    res.json({
      message: 'Token refresh successful',
      accessToken: result.AuthenticationResult?.AccessToken,
      idToken: result.AuthenticationResult?.IdToken,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: 'Token refresh failed', error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // In a real app, you might want to pass the access token in the body or extract it from the header
    // Here we assume the token to revoke is passed in the body or we use the one from the header
    const accessToken =
      req.body.accessToken || req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      return res
        .status(400)
        .json({ message: 'Access token required for global sign out' });
    }

    await cognitoService.logout(accessToken);
    res.json({ message: 'Logout successful' });
  } catch (error: any) {
    res.status(400).json({ message: 'Logout failed', error: error.message });
  }
};
