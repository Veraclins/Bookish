import { } from 'dotenv/config';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { User } from '../models/index'; //eslint-disable-line
import TokenService from '../services/TokenService';

export default class AuthController {
  static findOrCreateUser(req, res) {
    const { user } = req;
    User.findOrCreate({
      where: {
        email: user.email,
      },
      defaults: user,
      attributes: ['email'],
    }).spread(({ dataValues: newOrFoundUser }) => {
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
    });
  }

  static login(req, res) {
    passport.authenticate('login', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Username or password incorrect',
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        const token = jwt.sign(user, 'thissecret');
        return res.status(200).json({ user, token });
      });
      return null;
    })(req, res);
  }

  static signup(req, res) {
    passport.authenticate('signup', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Account already exists',
        });
      }
      // if (!user) return res.status(400).json({ message: 'User can not be found' });
      const token = jwt.sign({ id: user.id }, 'thissecret', { expiresIn: 86400 });
      return res.status(201).json({ user, token });
    })(req, res);
  }

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
        });
      })
      .catch(err => done(err));
  }

  static localSignupCallback(req, email, password, done) {
    User.findOne({ where: { email } })
      .then((result) => {
        if (result) {
          return done(null, false, { message: 'Account already exists' });
        }
        const hashedPassword = bcrypt.hashSync(password, 8);
        User.create({
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
  }

  static linkedInCallback(token, tokenSecret, profile, done) {
    const { displayName, _json: { emailAddress } } = profile;
    const user = {
      name: displayName,
      email: emailAddress,
    };
    done(null, user);
  }

  static googleCallback(acessToken, refreshToken, profile, done) {
    const user = {
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    done(null, user);
  }

  static facebookCallback(accessToken, refreshToken, profile, done) {
    const { name, email } = profile._json; // eslint-disable-line
    const user = {
      name,
      email,
    };
    done(null, user);
  }

  static githubCallback(token, tokenSecret, profile, done) {
    const { displayName, _json: { emailAddress } } = profile;
    const user = {
      name: displayName,
      email: emailAddress,
    };
    done(null, user);
  }
}
