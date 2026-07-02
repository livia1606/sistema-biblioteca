const express = require("express");
const router = express.Router();

const autenticarToken = require("../middleware/authMiddleware");
const permitirPerfis = require("../middleware/permissaoMiddleware");

const {
  listarUsuarios,
  cadastrarUsuario,
  editarUsuario,
  excluirUsuario,
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
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *       401:
 *         description: Token inválido ou não informado.
 *       403:
 *         description: Acesso negado.
 *       500:
 *         description: Erro interno do servidor.
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
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *       400:
 *         description: E-mail já cadastrado.
 *       401:
 *         description: Token inválido ou não informado.
 *       403:
 *         description: Acesso negado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post(
  "/",
  autenticarToken,
  permitirPerfis("ADMIN"),
  cadastrarUsuario
);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Editar usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               perfil:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       401:
 *         description: Token inválido ou não informado.
 *       403:
 *         description: Acesso negado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.put(
  "/:id",
  autenticarToken,
  permitirPerfis("ADMIN"),
  editarUsuario
);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Excluir usuário
 *     tags: [Usuários]
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
 *         description: Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       401:
 *         description: Token inválido ou não informado.
 *       403:
 *         description: Acesso negado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete(
  "/:id",
  autenticarToken,
  permitirPerfis("ADMIN"),
  excluirUsuario
);

module.exports = router;