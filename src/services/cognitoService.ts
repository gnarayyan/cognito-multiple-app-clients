import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  ConfirmSignUpCommand,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';
import * as crypto from 'crypto';
import { config } from '../config/env';
import { ClientConfig, ClientType } from '../lib/types';

const client = new CognitoIdentityProviderClient({ region: config.awsRegion });

const getClientConfig = (type: ClientType): ClientConfig => {
  if (type === 'mobile') {
    return {
      clientId: config.mobileClientId,
    };
  }
  return {
    clientId: config.webClientId,
    clientSecret: config.webClientSecret,
  };
};

const calculateSecretHash = (
  clientId: string,
  clientSecret: string,
  username: string
): string => {
  return crypto
    .createHmac('sha256', clientSecret)
    .update(username + clientId)
    .digest('base64');
};

export const signUp = async (
  clientType: ClientType,
  username: string,
  password: string,
  name: string
) => {
  const { clientId, clientSecret } = getClientConfig(clientType);
  const secretHash = clientSecret
    ? calculateSecretHash(clientId, clientSecret, username)
    : undefined;

  const command = new SignUpCommand({
    ClientId: clientId,
    SecretHash: secretHash,
    Username: username,
    Password: password,
    UserAttributes: [{ Name: 'name', Value: name }],
  });
  return client.send(command);
};

export const confirmSignUp = async (
  clientType: ClientType,
  username: string,
  code: string
) => {
  const { clientId, clientSecret } = getClientConfig(clientType);
  const secretHash = clientSecret
    ? calculateSecretHash(clientId, clientSecret, username)
    : undefined;

  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    SecretHash: secretHash,
    Username: username,
    ConfirmationCode: code,
  });
  return client.send(command);
};

export const login = async (
  clientType: ClientType,
  username: string,
  password: string
) => {
  const { clientId, clientSecret } = getClientConfig(clientType);
  const secretHash = clientSecret
    ? calculateSecretHash(clientId, clientSecret, username)
    : undefined;

  const authParams: Record<string, string> = {
    USERNAME: username,
    PASSWORD: password,
  };

  if (secretHash) {
    authParams.SECRET_HASH = secretHash;
  }

  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: clientId,
    AuthParameters: authParams,
  });
  return client.send(command);
};

export const refreshToken = async (
  clientType: ClientType,
  refreshToken: string,
  username: string
) => {
  const { clientId, clientSecret } = getClientConfig(clientType);
  const secretHash = clientSecret
    ? calculateSecretHash(clientId, clientSecret, username)
    : undefined;

  const authParams: Record<string, string> = {
    REFRESH_TOKEN: refreshToken,
  };

  if (secretHash) {
    authParams.SECRET_HASH = secretHash;
  }

  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    ClientId: clientId,
    AuthParameters: authParams,
  });
  return client.send(command);
};

export const logout = async (accessToken: string) => {
  const command = new GlobalSignOutCommand({
    AccessToken: accessToken,
  });
  return client.send(command);
};
