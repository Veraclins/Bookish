
import { Strategy as LinkedInStrategy } from 'passport-linkedin';
import passport from 'passport';

import LinkedInController from '../controllers/LinkedInController';

export default function runConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  /**
 * Config that tells passportJS to use LinkedInStrategy. Also specifies a method from
 * the LinkedIncController as the callback
 */
  passport.use(new LinkedInStrategy({
    consumerKey: process.env.LINKEDIN_API_KEY,
    consumerSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: 'http://localhost:3000/api/v1/auth/linkedin/redirect',
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline'],
  }, LinkedInController.passportCallback));


  /**
   * This is called when by passportJS when the done function is called in AuthController.addUser
   */
  passport.serializeUser(((user, done) => {
    done(null, user);
  }));
}
