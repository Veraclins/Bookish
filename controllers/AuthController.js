import { } from 'dotenv/config';
import bcrypt from 'bcrypt';
import { User } from '../models/index'; //eslint-disable-line
import TokenService from '../services/TokenService';

export default class AuthController {
  static sendResponse(req, res) {
    const tokenData = {
      id: newOrFoundUser.id,
    };
    const token = TokenService.createToken(tokenData);
    const { id, email, name } = newOrFoundUser;
    const userWithToken = {
      id,
      email,
      name,
      token,
    };
    res.status(201).send({
      status: 'success',
      data: userWithToken,
    });
  }

  static socialLogin(userInfo, done) {
    User.findOrCreate({
      where: {
        email: userInfo.email,
      },
      defaults: userInfo,
    }).spread((newOrFoundUser, created) => {
      if (!newOrFoundUser) return done(null, false);
      const { id, email, name } = newOrFoundUser.dataValues;
      return done(null, {
        id,
        email,
        name,
        created,
      });
    });
  }

  /*
  * This function is responsible for login in a user through the passport local
  * authentication strategy.
  * @params email
  */
  static localLoginCallback(email, password, done) {
    User.findOne({ where: { email } })
      .then((user) => {
        const verifyPassword = bcrypt.compareSync(password, user.password);
        if (!user || !verifyPassword) {
          return done(null, false);
        }
        return done(null, {
          id: user.dataValues.id,
          name: user.dataValues.name,
          email: user.dataValues.email,
          created: false,
        });
      })
      .catch(err => done(err));
  }

  static localSignupCallback(req, email, password, done) {
    User.findOne({ where: { email } })
      .then((result) => {
        if (result) {
          return done(null, false);
        }
        const hashedPassword = bcrypt.hashSync(password, 8);
        User.create({
          name: req.body.name,
          email,
          password: hashedPassword,
        })
          .then((user) => {
            if (!user) {
              return done(null, false);
            }
            return done(null, {
              id: user.dataValues.id,
              name: user.dataValues.name,
              email: user.dataValues.email,
              created: true,
            });
          })
          .catch(err => done(err));
        return null;
      })
      .catch(err => done(err));
  }

  static linkedInCallback(token, tokenSecret, profile, done) {
    const { displayName, _json: { emailAddress } } = profile;
    const userInfo = {
      name: displayName,
      email: emailAddress,
    };
    AuthController.socialLogin(userInfo, done);
  }

  static googleCallback(acessToken, refreshToken, profile, done) {
    const userInfo = {
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    AuthController.socialLogin(userInfo, done);
  }

  static facebookCallback(accessToken, refreshToken, profile, done) {
    const { name, email } = profile._json; // eslint-disable-line
    const userInfo = {
      name,
      email,
    };
    AuthController.socialLogin(userInfo, done);
  }

  static githubCallback(token, tokenSecret, profile, done) {
    const { displayName, _json: { emailAddress } } = profile;
    const userInfo = {
      name: displayName,
      email: emailAddress,
    };
    AuthController.socialLogin(userInfo, done);
  }
}
