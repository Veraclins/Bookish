import passport from 'passport';

const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/api/v1/auth/github/callback',
}, ((accessToken, refreshToken, profile, done) => {
  // console.log('GOOGLE_PROFILE', profile);
    try {
      const { username, profileUrl, provider } = profile;
      const email = profile.emails[0].value;
      done(null, {
        username, profileUrl, provider, email,
      });
    } catch (err) {
      const message = 'You need to add your github email from private settings';
      done(null, { message });
    }
  })));


export default passport;
