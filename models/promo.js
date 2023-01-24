export default (sequelize, DataTypes) => {
  const Promo = sequelize.define(
    "promo",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: true, //fild tidak boleh bernilai string kosong
          isUUID: 4,
        },
      },
      // product_id: {
      //   type: DataTypes.STRING(200),
      //   allowNull: false,
      //   allowNull: false,
      //   validate: {
      //     notEmpty: true, //fild tidak boleh bernilai string kosong
      //     len: [3, 100],
      //   },
      // },
      // Diskon
      percentase: {
        type: DataTypes.INTEGER,
      },
      // selisih dari harga normal - diskon
      value: {
        type: DataTypes.STRING(100),
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      // Karena pilih product yang mau di jadikan promo
    },
    {
      modelName: "promo",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Promo;
};
