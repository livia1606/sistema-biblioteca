const { Reader } = require("../models");

// Listar todos os leitores
const listarLeitores = async (req, res) => {
  try {
    const leitores = await Reader.findAll();

    res.status(200).json(leitores);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// Cadastrar um leitor
const cadastrarLeitor = async (req, res) => {
  try {
    const leitor = await Reader.create(req.body);

    res.status(201).json({
      mensagem: "Leitor cadastrado com sucesso!",
      leitor,
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// Editar um leitor
const editarLeitor = async (req, res) => {
  try {
    const leitor = await Reader.findByPk(req.params.id);

    if (!leitor) {
      return res.status(404).json({
        mensagem: "Leitor não encontrado.",
      });
    }

    await leitor.update(req.body);

    res.status(200).json({
      mensagem: "Leitor atualizado com sucesso!",
      leitor,
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

// Excluir um leitor
const excluirLeitor = async (req, res) => {
  try {
    const leitor = await Reader.findByPk(req.params.id);

    if (!leitor) {
      return res.status(404).json({
        mensagem: "Leitor não encontrado.",
      });
    }

    await leitor.destroy();

    res.status(200).json({
      mensagem: "Leitor removido com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

module.exports = {
  listarLeitores,
  cadastrarLeitor,
  editarLeitor,
  excluirLeitor,
};