

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: 'password',
    createdAt: '2018-07-17 21:54:49',
    updatedAt: '2018-07-17 21:54:49',
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@mail.com',
    password: 'password',
    createdAt: '2018-07-17 21:54:49',
    updatedAt: '2018-07-17 21:54:49',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
