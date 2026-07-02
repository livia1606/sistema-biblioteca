const sequelize = require("../config/database");

const User = require("./User")(sequelize);
const Book = require("./Book")(sequelize);
const Reader = require("./Reader")(sequelize);
const Loan = require("./Loan")(sequelize);

// Relacionamentos

Reader.hasMany(Loan, {
  foreignKey: "readerId",
});

Loan.belongsTo(Reader, {
  foreignKey: "readerId",
});

Book.hasMany(Loan, {
  foreignKey: "bookId",
});

Loan.belongsTo(Book, {
  foreignKey: "bookId",
});

module.exports = {
  sequelize,
  User,
  Book,
  Reader,
  Loan,
};