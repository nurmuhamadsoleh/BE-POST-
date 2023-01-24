export default (sequelize, DataTypes) => {
  const Medialist = sequelize.define(
    "medialist",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        // validate: {
        //   notEmpty: true,
        // },
      },
      size: {
        type: DataTypes.INTEGER,
      },
      nama: {
        type: DataTypes.STRING(200),
        allowNull: false,
        // validate: {
        //   notEmpty: true, //fild tidak boleh bernilai string kosong
        // },
      },
      public_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_ads: {
        type: DataTypes.INTEGER,
        // validate: {
        //   isNumeric: true,
        // },
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      modelName: "medialist",
      freezeTableName: true,
    }
  );
  return Medialist;
};
