import passport from 'passport';
import { Strategy as LinkedInStrategy } from 'passport-linkedin';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import local from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
import AuthController from '../controllers/AuthController';

// import LinkedInController from '../controllers/LinkedInController';
// import googleAuthController from '../controllers/googleAuthController';


const LocalStrategy = local.Strategy;

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
  }, AuthController.linkedInCallback));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/redirect',
  }, AuthController.googleCallback));

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails'],
  }, AuthController.facebookCallback));

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, AuthController.localLoginCallback));

  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false,
  }, AuthController.localSignupCallback));
  /**
   * This is called when by passportJS when the done function is called in AuthController.addUser
   */
  passport.serializeUser(((user, done) => {
    done(null, user);
  }));
}
