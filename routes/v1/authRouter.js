import { Router } from 'express';
import passport from 'passport';
import LinkedInController from '../../controllers/LinkedInController';
import FacebookAuthController from '../../controllers/FacebookAuthController';
import AuthController from '../../controllers/AuthController';

const authRouter = Router();

// LinkedIn authentication routes
authRouter.get('/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));

authRouter.get('/linkedin/redirect',
  passport.authenticate('linkedin'),
  AuthController.register);


// Facebook authentication routes
authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

authRouter.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  AuthController.register);


// Google authentication routes
authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/redirect',
  passport.authenticate('google'),
  AuthController.register);

// Local authentication with email and password
authRouter.post('/login',
  passport.authenticate('local'), AuthController.login);

// Local signup
authRouter.post('/signup', AuthController.signup);

export default authRouter;
