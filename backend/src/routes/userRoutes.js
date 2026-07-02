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

router.get("/", autenticarToken, permitirPerfis("ADMIN"), listarUsuarios);

router.post("/", autenticarToken, permitirPerfis("ADMIN"), cadastrarUsuario);

router.put("/:id", autenticarToken, permitirPerfis("ADMIN"), editarUsuario);

router.delete("/:id", autenticarToken, permitirPerfis("ADMIN"), excluirUsuario);

module.exports = router;