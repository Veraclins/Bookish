import { Router } from 'express';
import passport from 'passport';
import AuthController from '../controllers/AuthController';


const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google'), AuthController.register);

export default router;
