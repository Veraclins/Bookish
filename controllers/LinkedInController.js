import UserService from '../services/UserService';
/**
 * LinkedInController contains code for interacting with linkedin API for
 * authentication. This controller contains only static methods
 */
export default class LinkedInController {
  /**
   * This method is called when after the passport.authenticate() middleware has fired.
   * The method simply sends a success response message to the user that contains a token
   * to be used by the user in subsequent logins
   * The req object now contains the new user that was persisted into the database
   * @param {object} req the request object that contains the informations about the new
   * user and his token
   * @param {object} resp the response object
   */
  static sendResponse(req, resp) {
    const { user } = req;
    resp.status(200).json({
      data: user,
      status: 'success',
      message: 'Successfully authenticated the user',
    });
  }

  /**
   * Called  by passportJS when the linkedin authentication is complete.
   * This method extracts the name and emailAddress of the user and uses it to
   * create a new user to our database.
   * It first confirms that the user email does not exists in the database. If it do4s
   * it returns the user, if not it creates the user and persists it to the database
   * @param {object} token the token sent by linkedin
   * @param {object} tokenSecret the token secret sent by linkedin
   * @param {object} profile contains data about the user inclunding his emailAddress and other data
   * @param {*} done function called after process the user reqeust
   */
  static passportCallback(token, tokenSecret, profile, done) {
    const { displayName, _json: { emailAddress } } = profile;

    UserService.createOrGetUserFromProvider({
      name: displayName,
      email: emailAddress,
    }, done);
  }
}


// http://localhost:3000/api/v1/auth/linkedin/
