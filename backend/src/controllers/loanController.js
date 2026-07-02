const { Loan, Book, Reader } = require("../models");

// Listar todos os empréstimos
const listarEmprestimos = async (req, res) => {
  try {
    const emprestimos = await Loan.findAll({
      include: [{ model: Book }, { model: Reader }],
    });

    const hoje = new Date();

    for (const emprestimo of emprestimos) {
      if (
        emprestimo.status !== "DEVOLVIDO" &&
        emprestimo.dataPrevistaDevolucao &&
        new Date(emprestimo.dataPrevistaDevolucao) < hoje
      ) {
        await emprestimo.update({
          status: "ATRASADO",
        });
      }
    }

    const emprestimosAtualizados = await Loan.findAll({
      include: [{ model: Book }, { model: Reader }],
    });

    res.status(200).json(emprestimosAtualizados);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar empréstimos",
      erro: erro.message,
    });
  }
};

// Registrar empréstimo
const registrarEmprestimo = async (req, res) => {
  try {
    const { bookId, readerId, dataEmprestimo, dataPrevistaDevolucao } = req.body;

    const livro = await Book.findByPk(bookId);

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado." });
    }

    const leitor = await Reader.findByPk(readerId);

    if (!leitor) {
      return res.status(404).json({ mensagem: "Leitor não encontrado." });
    }
    
    if (leitor.status === "Inativo") {
      return res.status(400).json({
        mensagem: "Leitor inativo não pode realizar empréstimos.",
      });
    }

    if (livro.quantidadeDisponivel <= 0) {
      return res.status(400).json({
        mensagem: "Livro indisponível para empréstimo.",
      });
    }

    const emprestimo = await Loan.create({
      bookId,
      readerId,
      dataEmprestimo,
      dataPrevistaDevolucao,
      status: "Emprestado",
    });

    await livro.update({
      quantidadeDisponivel: livro.quantidadeDisponivel - 1,
    });

    res.status(201).json({
      mensagem: "Empréstimo registrado com sucesso!",
      emprestimo,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao registrar empréstimo",
      erro: erro.message,
    });
  }
};

// Registrar devolução
const registrarDevolucao = async (req, res) => {
  try {
    const emprestimo = await Loan.findByPk(req.params.id);

    if (!emprestimo) {
      return res.status(404).json({
        mensagem: "Empréstimo não encontrado.",
      });
    }

    if (emprestimo.status === "DEVOLVIDO") {
      return res.status(400).json({
        mensagem: "Este empréstimo já foi devolvido.",
      });
    }

    const livro = await Book.findByPk(emprestimo.bookId);

    if (!livro) {
      return res.status(404).json({
        mensagem: "Livro do empréstimo não encontrado.",
      });
    }

    await emprestimo.update({
      dataDevolucao: new Date(),
      status: "DEVOLVIDO",
    });

    await livro.update({
      quantidadeDisponivel: livro.quantidadeDisponivel + 1,
    });

    res.status(200).json({
      mensagem: "Devolução registrada com sucesso!",
      emprestimo,
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao registrar devolução",
      erro: erro.message,
    });
  }
};

module.exports = {
  listarEmprestimos,
  registrarEmprestimo,
  registrarDevolucao,
};