const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'fullName',
  },
  profilePicture: {
    type: DataTypes.STRING,
    defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    field: 'profilePicture'
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'isAdmin',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
}, {
  tableName: 'user', // Ensure this matches the actual table name
  timestamps: true,
  underscored: true,
});

module.exports = User;