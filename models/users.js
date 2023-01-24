export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: true, //fild tidak boleh bernilai string kosong
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          isEmail: true,
        },
        unique: {
          args: "email",
          msg: "The email is already taken!",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          // len: [5, 100],
        },
      },
      public_id: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   // notEmpty: true,
        //   isUrl: {
        //     msg: "Please enter your url",
        //   },
        // },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: "users",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return User;
};
