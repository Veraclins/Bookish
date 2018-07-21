import { } from 'dotenv/config';
import bcrypt from 'bcrypt';
import { User } from '../models/index'; //eslint-disable-line
import TokenService from '../services/TokenService';

/**
  * This class contains all the methods responsible for User authentication
  * including local and social auth by different providers using passport.js
  * And sending the right response to the client.
  */
export default class AuthController {
  /**
  * This method completes the authentication process.
  * It takes the id of the user from the user object in the request and
  * passes it to the TokenService class which signs it into a jwt token and
  * returns the token. The token is then added to the user object which is sent
  * in the response. The status code sent is 201 if the user was created or 200
  * otherwise.
  * @param {object} req the request object
  * @param {object} res the response object
  */

  static sendResponse(req, res) {
    if (!req.user.email) return res.status(400).send({ message: 'You need to add your github email from private settings' });
    const {
      id,
      email,
      created,
    } = req.user;
    const token = TokenService.createToken({ id, email });
    const userWithToken = {
      email,
      name: req.user.name,
      token,
    };
    if (created) return res.status(201).send({ user: userWithToken });
    return res.status(200).send({ user: userWithToken });
  }

  /**
  * This method completes the social authentication process
  * It accepts the user information from the different social Auth styrategies,
  * check if the user already exists in the database and create a User if not
  * there already, returns the user and calls the done() passport callback
  * which attaches the user to the request object and pass control to the
  * next middleware in the request lifecycle.
  * @param {object} userInfo the user information from the social auth provider
  * @param {*} done the callback function that completes passport auth and attach
  * the user object to the request
  */
  static finishSignup(userInfo, done) {
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

  /**
  * This method is responsible for user login through the passport local
  * authentication strategy.
  * @param {string} email the email address entered by the user
  * @param {string} password the user password entered by the user
  * @param {*} done the callback function that completes passport auth and attach
  * the user object to the request
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

  /**
  * This method is responsible for user signup through the passport local
  * authentication strategy.
  * @param {object} req the express request object
  * @param {string} email the email address entered by the user
  * @param {string} password the user password entered by the user
  * @param {*} done the callback function that completes passport auth and attach
  * the user object to the request
  */
  static localSignupCallback(req, email, password, done) {
    const userInfo = {
      name: req.body.name,
      email,
      password,
    };
    AuthController.finishSignup(userInfo, done);
    // User.findOne({ where: { email } })
    //   .then((result) => {
    //     if (result) {
    //       return done(null, false);
    //     }
    //     const hashedPassword = bcrypt.hashSync(password, 8);
    //     User.create({
    //       name: req.body.name,
    //       email,
    //       password: hashedPassword,
    //     })
    //       .then((user) => {
    //         if (!user) {
    //           return done(null, false);
    //         }
    //         return done(null, {
    //           id: user.dataValues.id,
    //           name: user.dataValues.name,
    //           email: user.dataValues.email,
    //           created: true,
    //         });
    //       });
    //   });
  }

  /**
  * This method is responsible for structuring the user information from
  * user login/signup through the passport linkedIn
  * authentication strategy.
  * @param {object} token the user token sent by linkedIn
  * @param {object} tokenSecret the user token secret sent by linkedIn
  * @param {object} profile the user profile object containing the user information from linkedIn
  * @param {*} done the callback function that completes passport auth and attach
  * the user object to the request
  */
  static linkedInCallback(token, tokenSecret, profile, done) {
    const { displayName, _json: { emailAddress } } = profile;
    const userInfo = {
      name: displayName,
      email: emailAddress,
    };
    AuthController.finishSignup(userInfo, done);
  }

  /**
  * This method is responsible for structuring the user information from
  * user login/signup through the passport Google
  * authentication strategy.
  * @param {object} accessToken the user token sent by Google
  * @param {object} refreshToken the user refresh token  sent by Google
  * @param {object} profile the user profile object containing the user information from linkedIn
  * @param {*} done the callback function that completes passport auth and attach
  * the user object to the request
  */
  static googleCallback(acessToken, refreshToken, profile, done) {
    const userInfo = {
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    AuthController.finishSignup(userInfo, done);
  }

  /**
  * This method is responsible for structuring the user information from
  * user login/signup through the passport Facebook
  * authentication strategy.
  * @param {object} accessToken the user token sent by Facebook
  * @param {object} refreshToken the user refresh token  sent by Facebook
  * @param {object} profile the user profile object containing the user information from linkedIn
  * @param {*} done the callback function that completes passport auth and attach
  * the user object to the request
  */
  static facebookCallback(accessToken, refreshToken, profile, done) {
    const { name, email } = profile._json; // eslint-disable-line
    const userInfo = {
      name,
      email,
    };
    AuthController.finishSignup(userInfo, done);
  }

  /**
  * This method is responsible for structuring the user information from
  * user login/signup through the passport Github
  * authentication strategy.
  * @param {object} token the user token sent by Github
  * @param {object} tokenSecret the user token secret sent by Github
  * @param {object} profile the user profile object containing the user information from linkedIn
  * @param {*} done the callback function that completes passport auth and attach
  * the user object to the request
  */
  static githubCallback(accessToken, refreshToken, profile, done) {
    const { username } = profile;
    const email = profile.emails[0].value;
    const userInfo = {
      name: username,
      email,
    };
    AuthController.finishSignup(userInfo, done);
  }
}
