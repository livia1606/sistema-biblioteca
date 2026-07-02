const { Loan, Book, Reader } = require("../models");

// Listar todos os empréstimos
const listarEmprestimos = async (req, res) => {
  try {
    const emprestimos = await Loan.findAll({
      include: [
        {
          model: Book,
        },
        {
          model: Reader,
        },
      ],
    });

    res.status(200).json(emprestimos);
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
    const emprestimo = await Loan.create(req.body);

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

    await emprestimo.update({
      dataDevolucao: new Date(),
      status: "DEVOLVIDO",
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