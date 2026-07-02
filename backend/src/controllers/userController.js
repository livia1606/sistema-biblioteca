const bcrypt = require("bcrypt");
const { User } = require("../models");

// Listar usuários
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: ["id", "nome", "email", "perfil", "createdAt"],
    });

    res.status(200).json(usuarios);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar usuários.",
      erro: erro.message,
    });
  }
};

// Cadastrar usuário
const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;

    const existe = await User.findOne({
      where: { email },
    });

    if (existe) {
      return res.status(400).json({
        mensagem: "E-mail já cadastrado.",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await User.create({
      nome,
      email,
      senha: senhaHash,
      perfil,
    });

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
      },
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar usuário.",
      erro: erro.message,
    });
  }
};

// Editar usuário
const editarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado.",
      });
    }

    const dados = {
      nome: req.body.nome,
      email: req.body.email,
      perfil: req.body.perfil,
    };

    if (req.body.senha && req.body.senha.trim() !== "") {
      dados.senha = await bcrypt.hash(req.body.senha, 10);
    }

    await usuario.update(dados);

    res.status(200).json({
      mensagem: "Usuário atualizado com sucesso!",
      usuario,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar usuário.",
      erro: erro.message,
    });
  }
};

// Excluir usuário
const excluirUsuario = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado.",
      });
    }

    await usuario.destroy();

    res.status(200).json({
      mensagem: "Usuário excluído com sucesso!",
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao excluir usuário.",
      erro: erro.message,
    });
  }
};

module.exports = {
  listarUsuarios,
  cadastrarUsuario,
  editarUsuario,
  excluirUsuario,
};