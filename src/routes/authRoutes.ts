import { Router } from 'express';
import * as authController from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', authController.signup);
router.post('/confirm-signup', authController.confirmSignup);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', verifyToken, authController.logout);

// Example protected route
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'You have access to this protected route!',
    user: (req as any).user,
  });
});

export default router;
