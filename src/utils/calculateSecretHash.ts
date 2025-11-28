import { createHmac } from 'crypto';

export const calculateSecretHash = (
  clientId: string,
  clientSecret: string,
  username: string
): string => {
  return createHmac('sha256', clientSecret)
    .update(username + clientId)
    .digest('base64');
};
