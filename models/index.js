"use strict";
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import product from "./product.js";
import category from "./category.js";
import medialist from "./medialist.js";
import orders from "./orders.js";
import pemasukan from "./pemasukan.js";
import customers from "./customers.js";
import pengeluaran from "./pengeluaran.js";
import promo from "./promo.js";
import users from "./users.js";
import paket from "./paket.js";
import orderProduct from "./orderProduct.js";

const dbs = {};
// dbs.Sequelize sebuah key dan Sequelize sebuah value
dbs.Sequelize = Sequelize;
dbs.sequelize = db;
dbs.product = product(db, Sequelize);
dbs.category = category(db, Sequelize);
dbs.medialist = medialist(db, Sequelize);
dbs.orders = orders(db, Sequelize);
dbs.customers = customers(db, Sequelize);
dbs.pemasukan = pemasukan(db, Sequelize);
dbs.pengeluaran = pengeluaran(db, Sequelize);
dbs.promo = promo(db, Sequelize);
dbs.users = users(db, Sequelize);
dbs.paket = paket(db, Sequelize);
dbs.product_order = orderProduct(db, Sequelize);

// Relastion One To Many
// Many To Many
// dbs.productPromo.belongsToMany(dbs.product, { through: dbs.productPromo });
// dbs.productPromo.belongsToMany(dbs.promo, { through: dbs.productPromo });
// productId & promoId
// Product & Promo
dbs.product.hasMany(dbs.promo, {
  as: "promo",
  onDelete: "RESTRICT", //menghapus table promo baru bisa product di hapus.
  onUpdate: "RESTRICT",
});
dbs.promo.belongsTo(dbs.product, {
  foreignKey: "productId", //product Id nya ada promo
  as: "product",
});
dbs.product.hasMany(dbs.medialist, {
  as: "medialist",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
dbs.medialist.belongsTo(dbs.product, {
  foreignKey: "productId",
  as: "product",
});
dbs.product.hasMany(dbs.category, {
  as: "category",
  onDelete: "CASCADE", //menghapus table promo baru bisa product di hapus.
  onUpdate: "CASCADE",
});
dbs.category.belongsTo(dbs.product, {
  foreignKey: "productId",
  as: "product",
});

// dbs.customers.hasMany(dbs.orders, {
//   as: "orders",
//   onDelete: "RESTRICT",
//   onUpdate: "RESTRICT",
// });
// dbs.orders.belongsTo(dbs.customers, {
//   foreignKey: "customers_id",
//   as: "customers",
// });
dbs.product.hasMany(dbs.paket, {
  as: "paket",
  onDelete: "NO ACTION", //jika tabelpaket di hapus maka yan berelasi tidak akan terhapus
  onUpdate: "NO ACTION",
});
dbs.paket.belongsTo(dbs.product, {
  foreignKey: "productId",
  as: "product",
});
// relasi many to many order dan matakuliah
dbs.product.belongsToMany(dbs.orders, { through: dbs.product_order });
dbs.orders.belongsToMany(dbs.product, { through: dbs.product_order });
// dbs.users.hasMany(dbs.orders, {
//   as: "orders",
//   onDelete: "RESTRICT",
//   onUpdate: "RESTRICT",
// });
// dbs.orders.belongsTo(dbs.users, {
//   foreignKey: "users_id",
//   as: "users",
// });
// dbs.product.hasMany(dbs.order_details, {
//   as: "order_details",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// dbs.order_details.belongsTo(dbs.product, {
//   foreignKey: "productId",
//   as: "product",
// });
// dbs.order_details.hasMany(dbs.pengeluaran, {
//   as: "pengeluaran",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// dbs.pengeluaran.belongsTo(dbs.order_details, {
//   foreignKey: "order_details_id",
//   as: "order_details",
// });
// dbs.orders.hasOne(dbs.order_details, {
//   as: "order_details",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// dbs.order_details.belongsTo(dbs.orders, {
//   foreignKey: {
//     name: "orders_id",
//     allowNull: false,
//     // type: DataTypes.UUID4,
//   },
//   as: "orders",
// });
// dbs.pengeluaran.hasOne(dbs.pemasukan, {
//   as: "pemasukan",
//   onDelete: "CASCADE", //kalau masih tidak terhapus table pemasukan tambahkan juga di tabel pemasukan
//   onUpdate: "CASCADE",
// });
// dbs.pemasukan.belongsTo(dbs.pengeluaran, {
//   foreignKey: {
//     name: "pengeluaran_id",
//     allowNull: false, //tidak boleh kososng
//     // type: DataTypes.UUID4,
//     // kalau delete pemasukan nya doang ga perlu pakai cascade, kecuali mau delete pengeluaran maka perlu menggunakan cascade
//     // Jika masih ga bisa juga tambahkan refrences
//     // references: {
//     //   table: "pengeluaran",
//     //   field: 'id'
//     // },
//   },
//   as: "pengeluaran",
// });
export default dbs;
// untuk menamppilkan data promo di tabel proucts
//where
//include: ["promo"]
// atau utum mnapilkan fild
// include: [
//   {
//     model: dbs.roles,
//     as: "roles",
//     attribute: ["role"]
//   }
// ]

// untuk get many to many di controller untuk
// include: [
//   {
//     // model: dbs.mahasiswa2,  atau bisa menggunakan alias ['mahasiswa2']
//     through:{
//     //attrributes: [] agar tidak di tampilkan
//     //}
//   }
// ]
