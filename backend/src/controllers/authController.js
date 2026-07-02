const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado.",
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        mensagem: "Senha incorreta.",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
      },
      process.env.JWT_SECRET || "segredo",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
      },
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao realizar login.",
      erro: erro.message,
    });
  }
};

module.exports = {
  login,
};