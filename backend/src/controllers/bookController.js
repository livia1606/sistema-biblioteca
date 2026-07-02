const { Book } = require("../models");

const listarLivros = async (req, res) => {
  try {
    const livros = await Book.findAll();

    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

const cadastrarLivro = async (req, res) => {
  try {
    const livro = await Book.create(req.body);

    res.status(201).json(livro);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
};

const editarLivro = (req, res) => {
    res.status(200).json({
        mensagem: `Livro ${req.params.id} atualizado`
    });
};

const excluirLivro = (req, res) => {
    res.status(200).json({
        mensagem: `Livro ${req.params.id} removido`
    });
};

module.exports = {
    listarLivros,
    cadastrarLivro,
    editarLivro,
    excluirLivro
};