const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Book", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    editora: {
      type: DataTypes.STRING,
    },

    categoria: {
      type: DataTypes.STRING,
    },

    isbn: {
      type: DataTypes.STRING,
      unique: true,
    },

    anoPublicacao: {
      type: DataTypes.INTEGER,
    },

    quantidadeTotal: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    quantidadeDisponivel: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });
};