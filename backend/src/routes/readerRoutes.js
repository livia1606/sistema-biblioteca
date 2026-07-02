const express = require("express");
const router = express.Router();

const autenticarToken = require("../middleware/authMiddleware");
const permitirPerfis = require("../middleware/permissaoMiddleware");

const {
  listarLeitores,
  cadastrarLeitor,
  editarLeitor,
  excluirLeitor,
  historicoEmprestimosLeitor
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Miguel
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               telefone:
 *                 type: string
 *                 example: (11) 99999-9999
 *               cpf:
 *                 type: string
 *                 example: 12345678900
 *               endereco:
 *                 type: string
 *                 example: Rua das Flores, 100
 *     responses:
 *       201:
 *         description: Leitor cadastrado com sucesso
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

/**
 * @swagger
 * /api/leitores/{id}/emprestimos:
 *   get:
 *     summary: Histórico de empréstimos do leitor
 *     tags: [Leitores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico retornado com sucesso
 */
router.get(
  "/:id/emprestimos",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  historicoEmprestimosLeitor
);

module.exports = router;