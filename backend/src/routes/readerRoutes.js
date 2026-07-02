const express = require("express");
const router = express.Router();

const autenticarToken = require("../middleware/authMiddleware");
const permitirPerfis = require("../middleware/permissaoMiddleware");

const {
  listarLeitores,
  cadastrarLeitor,
  editarLeitor,
  excluirLeitor
} = require("../controllers/readerController");

/**
 * @swagger
 * tags:
 *   name: Leitores
 *   description: Gerenciamento de leitores
 */

/**
 * @swagger
 * /api/leitores:
 *   get:
 *     summary: Listar leitores
 *     tags: [Leitores]
 */
router.get(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  listarLeitores
);

/**
 * @swagger
 * /api/leitores:
 *   post:
 *     summary: Cadastrar leitor
 *     tags: [Leitores]
 */
router.post(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  cadastrarLeitor
);

/**
 * @swagger
 * /api/leitores/{id}:
 *   put:
 *     summary: Editar leitor
 *     tags: [Leitores]
 */
router.put(
  "/:id",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  editarLeitor
);

/**
 * @swagger
 * /api/leitores/{id}:
 *   delete:
 *     summary: Excluir leitor
 *     tags: [Leitores]
 */
router.delete(
  "/:id",
  autenticarToken,
  permitirPerfis("ADMIN"),
  excluirLeitor
);

module.exports = router;