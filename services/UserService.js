
import { User } from '../models/index'; //eslint-disable-line
import TokenService from './TokenService';

/**
 * This class contains code to create or find a user from the database.
 */
export default class UserService {
  /**
   *This method creates a new user in the database or retrieves an existing user if the email
   of the user is found in the database
   * @param {object} user the user to be inserted into the database. If the user email exists,
   * the existing user is passed to the @code done function is called
   * @param {function done} done this callback function is gotten from the passportJS
   * done function and passed to this method argument. It is called when the data has been
   * processed successfully
   */
  static createOrGetUserFromProvider(user, done) {
    User.findOrCreate({
      where: {
        email: user.email,
      },
      defaults: user,
      attributes: ['email'],
    }).spread(({ dataValues: newOrFoundUser }) => {
      TokenService.createToken(newOrFoundUser, (err, token) => {
        const userWithToken = newOrFoundUser;

        userWithToken.token = token;
        done(null, userWithToken);
      });
    });
  }
}
