module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Must be a valid email address',
        },
      },
      unique:true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Book, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
