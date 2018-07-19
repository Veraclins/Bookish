export default class AuthController {
  static register(req, res) {
    const { user } = req;
    res.send(user);
  }
}
