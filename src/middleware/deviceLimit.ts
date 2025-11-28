// import { Request, Response, NextFunction } from 'express';
// import { getRefreshToken } from '../utils/tokenRepo';

// export function deviceLimit(client: 'mobile' | 'web') {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const userSub = (req as any).user['cognito:username']; // or sub
//     const exists = getRefreshToken({ userSub, client });
//     if (exists) {
//       return res
//         .status(409)
//         .json({ message: 'Another device is logged in. Log it out first.' });
//     }
//     next();
//   };
// }
