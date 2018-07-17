module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    strategyType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    strategyId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Book, {
      foreignKey: 'userId',
      as: 'books',
    });
  };
  return User;
};
