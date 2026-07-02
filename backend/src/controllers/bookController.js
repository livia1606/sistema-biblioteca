const { Book } = require("../models");

const listarLivros = async (req, res) => {
  try {
    const livros = await Book.findAll();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const cadastrarLivro = async (req, res) => {
  try {
    const livro = await Book.create(req.body);
    res.status(201).json(livro);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const editarLivro = async (req, res) => {
  try {
    const livro = await Book.findByPk(req.params.id);

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado." });
    }

    await livro.update(req.body);

    res.status(200).json({
      mensagem: "Livro atualizado com sucesso!",
      livro,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const excluirLivro = async (req, res) => {
  try {
    const livro = await Book.findByPk(req.params.id);

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado." });
    }

    await livro.destroy();

    res.status(200).json({
      mensagem: "Livro removido com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

module.exports = {
  listarLivros,
  cadastrarLivro,
  editarLivro,
  excluirLivro,
};