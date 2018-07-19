import { } from 'dotenv/config';
import jwt from 'jsonwebtoken';
import passport from 'passport';


export default class AuthController {
  static register(req, res) {
    const { user } = req;
    res.send(user);
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
}
