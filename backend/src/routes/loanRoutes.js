const express = require("express");
const router = express.Router();

const autenticarToken = require("../middleware/authMiddleware");
const permitirPerfis = require("../middleware/permissaoMiddleware");

const {
  listarEmprestimos,
  registrarEmprestimo,
  registrarDevolucao,
} = require("../controllers/loanController");

/**
 * @swagger
 * tags:
 *   name: Empréstimos
 *   description: Gerenciamento de empréstimos
 */

/**
 * @swagger
 * /api/emprestimos:
 *   get:
 *     summary: Listar empréstimos
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empréstimos
 */
router.get(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  listarEmprestimos
);

/**
 * @swagger
 * /api/emprestimos:
 *   post:
 *     summary: Registrar empréstimo
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dataEmprestimo
 *               - dataPrevistaDevolucao
 *               - bookId
 *               - readerId
 *             properties:
 *               dataEmprestimo:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-02"
 *               dataPrevistaDevolucao:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-09"
 *               bookId:
 *                 type: integer
 *                 example: 1
 *               readerId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Empréstimo registrado com sucesso
 */
router.post(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  registrarEmprestimo
);

/**
 * @swagger
 * /api/emprestimos/{id}/devolucao:
 *   put:
 *     summary: Registrar devolução
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Devolução registrada com sucesso
 */
router.put(
  "/:id/devolucao",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  registrarDevolucao
);

module.exports = router;