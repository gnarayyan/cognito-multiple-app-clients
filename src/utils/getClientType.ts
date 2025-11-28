import { Request } from 'express';

export enum ClientType {
  mobile,
  web,
}

export const getClientType = (req: Request): ClientType => {
  const type = req.headers['x-client-type'];
  if (type === 'mobile') return ClientType.mobile;
  return ClientType.web;
};
