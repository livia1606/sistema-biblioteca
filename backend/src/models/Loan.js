const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Loan", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    dataEmprestimo: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    dataPrevistaDevolucao: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    dataDevolucao: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "Emprestado",
    },
  });
};