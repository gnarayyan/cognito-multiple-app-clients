// import NodeCache from 'node-cache';

// interface Key {
//   userSub: string;
//   client: ClientType;
// }

// export const tokenCache = new NodeCache({ stdTTL: 0 }); // never auto-delete

// export function saveRefreshToken(key: Key, refreshToken: string) {
//   tokenCache.set(`${key.userSub}#${key.client}`, refreshToken);
// }

// export function getRefreshToken(key: Key): string | undefined {
//   return tokenCache.get(`${key.userSub}#${key.client}`);
// }

// export function clearSession(key: Key) {
//   tokenCache.del(`${key.userSub}#${key.client}`);
// }
