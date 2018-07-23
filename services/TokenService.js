import jwt from 'jsonwebtoken';

/**
 * Contains code for creating and decoding jwt tokens
 */
export default class TokenService {
  /**
   * Creates a new token using a payload
   * @param {object} payload  the user information to be signed into the token
   */
  static createToken(payload) {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: 1209600,
    });
    return token;
  }


  /**
  * This middleware method is responsible for decoding the token sent in the
  * request object. If the token is valid, the request is passed to the next
  * function attaching the id of the user to the request.
  * @param {object} req the request object
  * @param {object} res the response object
  * @param {*} next passes control out of this method
  */
  static async decodeToken(req, res, next) {
    const token = req.headers['x-access-token'];
    try {
      if (!token) {
        res.status(400).send({ error: 'You must supply an access token' });
      } else {
        await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
          if (decoded) {
            const { id } = decoded;
            req.user = { id };
            next();
          } else {
            res.status(401).send({ Error: 'Your access is invalid or expired. Please login again' });
          }
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
