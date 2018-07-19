import { Router } from 'express';
import passport from 'passport';
import LinkedInController from '../../controllers/LinkedInController';

const authRouter = Router();
authRouter.get('/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));


authRouter.get('/linkedin/redirect',
  passport.authenticate('linkedin'),
  LinkedInController.sendResponse);

export default authRouter;
