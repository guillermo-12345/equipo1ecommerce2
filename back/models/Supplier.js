const { DataTypes } = require('sequelize');
const sequelize = require('../../src/components/service/dbConfig');

const Supplier = sequelize.define('Supplier', {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  category: DataTypes.STRING,
});

module.exports = Supplier;
