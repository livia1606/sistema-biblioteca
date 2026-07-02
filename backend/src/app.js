const express = require("express");
const cors = require("cors");


const { sequelize } = require("./models");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const readerRoutes = require("./routes/readerRoutes");
const loanRoutes = require("./routes/loanRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    mensagem: "API do Sistema de Biblioteca funcionando"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/livros", bookRoutes);
app.use("/api/leitores", readerRoutes);
app.use("/api/emprestimos", loanRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

sequelize
  .sync()
  .then(() => {
    console.log("Banco sincronizado com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco:", err);
  });

module.exports = app;