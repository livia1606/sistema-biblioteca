const express = require("express");
const router = express.Router();

const autenticarToken = require("../middleware/authMiddleware");
const permitirPerfis = require("../middleware/permissaoMiddleware");

const {
  listarLivros,
  cadastrarLivro,
  editarLivro,
  excluirLivro
} = require("../controllers/bookController");

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Gerenciamento de livros
 */

/**
 * @swagger
 * /api/livros:
 *   get:
 *     summary: Listar livros
 *     tags: [Livros]
 */
router.get(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO", "LEITOR"),
  listarLivros
);

/**
 * @swagger
 * /api/livros:
 *   post:
 *     summary: Cadastrar livro
 *     tags: [Livros]
 */
router.post(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  cadastrarLivro
);

/**
 * @swagger
 * /api/livros/{id}:
 *   put:
 *     summary: Editar livro
 *     tags: [Livros]
 */
router.put(
  "/:id",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  editarLivro
);

/**
 * @swagger
 * /api/livros/{id}:
 *   delete:
 *     summary: Excluir livro
 *     tags: [Livros]
 */
router.delete(
  "/:id",
  autenticarToken,
  permitirPerfis("ADMIN"),
  excluirLivro
);

module.exports = router;