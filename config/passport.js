import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import googleAuthController from '../controllers/googleAuthController';


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/google/redirect',
}, googleAuthController));

passport.serializeUser(((user, done) => {
  done(null, user);
}));
