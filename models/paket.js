export default (sequelize, DataTypes) => {
  const Paket = sequelize.define(
    "paket",
    {
      id: {
        // type: DataTypes.STRING,
        // defaultValue: DataTypes.UUIDV4,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        // validate: {
        //   notEmpty: true, //fild tidak boleh bernilai string kosong
        // },
      },
      jenis_paket: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true, //fild tidak boleh bernilai string kosong
        },
      },
      price: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true, //fild tidak boleh bernilai string kosong
        },
      },
      // Relasi Product ---> Bukan Product Relasi ke Paket Klau seperti ini jadinya many to many si prdouct
    },
    {
      modelName: "paket",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Paket;
};
