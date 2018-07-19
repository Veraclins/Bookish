
import { User } from '../models';

/**
 * FacebookAuthController contains code for interacting with facebook API for
 * authentication. This controller contains only static methods
 */
export default class FacebookAuthController {
  static sendResponse(req, resp) {
    const {id, name, email } = req.user
    console.log(id);
    const fId = id;
    User.findOrCreate({
      where: {
        email,
      },
      defaults: {name},
    }).spread((user, created) => {
        const authUser =  user.get({plain: true});
        authUser.justCreated = created;
        resp.status(200).json({
          data: user,
          facebook: fId,
          status: 'success',
          message:  user.justCreated ? 'Account successfully created' : 'Login successful',
      });
    })
  }
}

