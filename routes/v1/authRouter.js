import { Router } from 'express';
import passport from 'passport';
import LinkedInController from '../../controllers/LinkedInController';
import FacebookAuthController from '../../controllers/FacebookAuthController';

const authRouter = Router();
authRouter.get('/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));


authRouter.get('/linkedin/redirect',
  passport.authenticate('linkedin'),
  LinkedInController.sendResponse);

authRouter.get('/', passport.authenticate('facebook', { scope: ['email'] }));
  
authRouter.get('/callback',
  passport.authenticate('facebook', { session: false }),
  FacebookAuthController.sendResponse);
  
export default authRouter;
