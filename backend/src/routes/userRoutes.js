const express = require("express");
const router = express.Router();

const autenticarToken = require("../middleware/authMiddleware");
const permitirPerfis = require("../middleware/permissaoMiddleware");

const {
  listarUsuarios,
  cadastrarUsuario,
} = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN"),
  listarUsuarios
);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cadastrar usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - perfil
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *               perfil:
 *                 type: string
 *                 example: BIBLIOTECARIO
 */
router.post(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN"),
  cadastrarUsuario
);

module.exports = router;