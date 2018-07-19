import jwt from 'jsonwebtoken';

/**
 * Contains code for creating and decoding tokens
 */
export default class TokenService {
  /**
   * Creates a new token using a payload
   * @param {object} payload  the user to be created
   * @param {*} callback called after the user has been successully decoded
   */
  static createToken(payload, callback) {
    jwt.sign(payload, process.env.TOKEN_SECRET, callback);
  }


  /**
 *
 * @param {object} token the token to be decoded
 * @param {*} callback called with the decoded token
 */
  static decodeToken(token, callback) {
    jwt.verify(token, process.env.TOKEN_SECRET, callback);
  }
}
