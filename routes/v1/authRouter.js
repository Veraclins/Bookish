import { Router } from 'express';
import passport from 'passport';
import AuthController from '../../controllers/AuthController';

// import LinkedInController from '../../controllers/LinkedInController';
// import FacebookAuthController from '../../controllers/FacebookAuthController';

const authRouter = Router();

// LinkedIn authentication routes
authRouter.get('/linkedin',
  passport.authenticate('linkedin',
    { scope: ['r_basicprofile', 'r_emailaddress'] }));

authRouter.get('/linkedin/redirect',
  passport.authenticate('linkedin', { session: false }),
  AuthController.linkedInCallback);


// Facebook authentication routes
authRouter.get('/facebook',
  passport.authenticate('facebook',
    { scope: ['email'] }));

authRouter.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  AuthController.facebookCallback);


// Google authentication routes
authRouter.get('/google',
  passport.authenticate('google',
    { scope: ['profile', 'email'] }));

authRouter.get('/google/redirect',
  passport.authenticate('google', { session: false }),
  AuthController.googleCallback);

// Local authentication with email and password
authRouter.post('/login',
  passport.authenticate('login',
    AuthController.localLoginCallback));

authRouter.post('/signup',
  passport.authenticate('signup',
    AuthController.localSignupCallback));


export default authRouter;
