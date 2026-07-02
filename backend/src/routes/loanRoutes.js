const express = require("express");
const router = express.Router();

const autenticarToken = require("../middleware/authMiddleware");
const permitirPerfis = require("../middleware/permissaoMiddleware");

const {
  listarEmprestimos,
  registrarEmprestimo,
  registrarDevolucao
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
 */
router.put(
  "/:id/devolucao",
  autenticarToken,
  permitirPerfis("ADMIN", "BIBLIOTECARIO"),
  registrarDevolucao
);

module.exports = router;