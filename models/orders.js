export default (sequalize, DataTypes) => {
  const Order = sequalize.define(
    "order",
    {
      id: {
        // type: DataTypes.STRING,
        // defaultValue: DataTypes.UUIDV4,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        // unique: true,
        // validate: {
        //   notEmpty: true,
        // },
      },
      kode_invoice: {
        type: DataTypes.STRING(200),
        unique: true,
      },
      qty: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          notEmpty: true,
        },
      },
      total_harga: {
        type: DataTypes.STRING(200),
      },
      biaya_add: {
        type: DataTypes.STRING(200),
      },
      description: {
        type: DataTypes.TEXT,
      },
      total_payment: {
        type: DataTypes.STRING(200),
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      // tota Product
      total_product: {
        type: DataTypes.STRING(200),
      },
      status_payment: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      modelName: "order",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Order;
};
