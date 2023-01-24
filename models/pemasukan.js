export default (sequelize, DataTypes) => {
  const Pemasukan = sequelize.define(
    "Pemasukan",
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
      laba_bersih: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      laba_kotor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
    },
    {
      modelName: "Product",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Pemasukan;
};
