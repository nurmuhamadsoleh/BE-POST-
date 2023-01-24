import dbs from "./index.js";
import orders from "./orders.js";
import product from "./product.js";
// import dbs from "./index.js";
// import orders from "./orders";

export default (sequelize, DataTypes) => {
  const orderProduct = sequelize.define(
    "orderProduct",
    {
      //   id: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     autoIncrement: true,
      //     primaryKey: true,
      //   },
      order2Id: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: orders,
          key: "id",
        },
      },
      product2Id: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: product,
          key: "id",
        },
      },
      //   selfGranted: DataTypes.BOOLEAN,
    },
    {
      freezeTableName: true,
    }
  );
  return orderProduct;
};
