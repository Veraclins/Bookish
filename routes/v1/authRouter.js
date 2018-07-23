import { Router } from 'express';
import passport from 'passport';
import AuthController from '../../controllers/AuthController';
import Validator from '../../validators/Validator';

// import LinkedInController from '../../controllers/LinkedInController';
// import FacebookAuthController from '../../controllers/FacebookAuthController';

const authRouter = Router();

// Already has /api/v1/auth appended to the route

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

// Github authentication routes
authRouter.get('/github',
  passport.authenticate('github', { scope: ['email'] }));

authRouter.get('/github/callback',
  passport.authenticate('github', { session: false }), AuthController.githubCallback);


// Local authentication with email and password
authRouter.post('/login',
  passport.authenticate('login'));

authRouter.post('/signup', Validator.validateUser,
  passport.authenticate('signup'));


export default authRouter;
