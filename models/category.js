export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        // type: DataTypes.STRING,
        // defaultValue: DataTypes.UUID4,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        // validate: {
        //   notEmpty: true,
        // },
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 100],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
    },
    {
      modelName: "category",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Category;
};
