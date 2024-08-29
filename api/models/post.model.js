import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Post = sequelize.define('post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'userId',
  },
  content: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'https://firebasestorage.googleapis.com/v0/b/namphuoc1-web.appspot.com/o/postImages%2F1724577083558-image-removebg-preview%20(2).png?alt=media&token=5801d5be-b6fe-43cf-8a1a-6220b463344c',
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'uncategorized',
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isFile: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'isFile',
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
  tableName: 'post', // Ensure this matches the actual table name
  timestamps: true,
  underscored: true,
});

export default Post;