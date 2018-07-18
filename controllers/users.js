import models from '../models';

// const { sequelize } = require('../models');

module.exports = {
  createUser(req, res) {
    // sequelize.sync({ force: true });

    // console.log(req.body);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    models.User.create(newUser)
      .then((user) => {
        res.send({
          status: 'success',
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 'error',
          message: err.message,
        });
      });
  },

};
