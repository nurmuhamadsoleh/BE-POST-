export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false, //Tidak Boleh kosong
        primaryKey: true,
        autoIncrement: true,
        // validate: {
        //   notEmpty: true, //fild tidak boleh bernilai string kosong
        // },
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        // validate: {
        //   notEmpty: true, //fild tidak boleh bernilai string kosong
        // },
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        // validate: {
        //   notEmpty: true,
        // },
      },
      // products: {
      //   type: DataTypes.STRING(140),
      //   allowNull: false,
      //   validate: {
      //     notEmpty: true,
      //   },
      // },
      stock: {
        type: DataTypes.INTEGER,
        // validate: {
        //   isNumeric: true,
        // },
      },
      price: {
        type: DataTypes.STRING(100),
        allowNull: false,
        // validate: {
        //   notEmpty: true,
        // },
      },
      // CategoryId ada di product --> Jadi melakukan Insert Kategori nya dulu baru nanti di bagian product pilih kategori nya
    },
    {
      modelName: "product",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Product;
};
