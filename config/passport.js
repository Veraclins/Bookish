import passport from 'passport';
import local from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import bcrypt from 'bcrypt';
import GoogleStrategy from 'passport-google-oauth20';
import db from '../models';
import googleAuthController from '../controllers/googleAuthController';

const LocalStrategy = local.Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/google/redirect',
}, googleAuthController));

passport.serializeUser(((user, done) => {
  done(null, user);
}));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
}, (email, password, done) => {
  db.User.findOne({ where: { email } })
    .then((user) => {
      const verifyPassword = bcrypt.compareSync(password, user.password);
      if (!user || !verifyPassword) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      return done(null, {
        id: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
      }, { message: 'Logged In Successfully' });
    })
    .catch(err => done(err));
}));

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
}, (req, email, password, done) => {
  db.User.findOne({ where: { email } })
    .then((result) => {
      if (result) {
        return done(null, false, { message: 'Account already exists' });
      }
      const hashedPassword = bcrypt.hashSync(password, 8);
      db.User.create({
        name: req.body.name,
        email,
        password: hashedPassword,
      })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Something is not right' });
          }
          return done(null, {
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
          }, { message: 'Account created successfully' });
        })
        .catch(err => done(err));
      return null;
    })
    .catch(err => done(err));
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails'],
  },

  function(accessToken, refreshToken, profile, done) {
    const { id, name, email} = profile._json;
    
    console.log(id);
      done(null, { id, name, email });
}
));

