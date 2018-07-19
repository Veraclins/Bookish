import models from '../models';

const googleAuthController = (acessToken, refreshToken, profile, done) => {
  const user = {
    name: profile.displayName,
    email: profile.emails[0].value,
  };
  done(null, user);
};

export default googleAuthController;
