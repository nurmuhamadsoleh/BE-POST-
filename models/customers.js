export default (sequelize, DataTypes) => {
  const Customers = sequelize.define(
    "Customer",
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
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notEmpty: true, //fild tidak boleh bernilai string kosong
        },
      },
      jenis_kelamin: {
        type: DataTypes.ENUM("laki-laki", "perempuan"),
      },
      contact: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT("long"),
      },
    },
    {
      modelName: "Product",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Customers;
};
