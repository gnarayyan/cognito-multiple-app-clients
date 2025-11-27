export type ClientType = 'web' | 'mobile';

export interface ClientConfig {
  clientId: string;
  clientSecret?: string;
}
