const express = require("express");
const router = express.Router();

const autenticarToken = require("../middleware/authMiddleware");
const permitirPerfis = require("../middleware/permissaoMiddleware");

const {
  listarLivros,
  cadastrarLivro,
  editarLivro,
  excluirLivro,
} = require("../controllers/bookController");

router.get(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO", "LEITOR"),
  listarLivros
);

router.post(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  cadastrarLivro
);

router.put(
  "/:id",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  editarLivro
);

router.delete(
  "/:id",
  autenticarToken,
  permitirPerfis("ADMIN"),
  excluirLivro
);

module.exports = router;