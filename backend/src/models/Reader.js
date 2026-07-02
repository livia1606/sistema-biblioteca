const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Reader", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    telefone: {
      type: DataTypes.STRING,
    },

    cpf: {
      type: DataTypes.STRING,
      unique: true,
    },

    endereco: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Ativo",
    },
  });
};