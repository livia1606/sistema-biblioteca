// Controller de Empréstimos

const listarEmprestimos = async (req, res) => {
  try {
    res.status(200).json({
      mensagem: "Listando todos os empréstimos"
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar empréstimos",
      erro: erro.message
    });
  }
};

const registrarEmprestimo = async (req, res) => {
  try {
    res.status(201).json({
      mensagem: "Empréstimo registrado com sucesso"
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao registrar empréstimo",
      erro: erro.message
    });
  }
};

const registrarDevolucao = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      mensagem: `Devolução do empréstimo ${id} registrada`
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao registrar devolução",
      erro: erro.message
    });
  }
};

module.exports = {
  listarEmprestimos,
  registrarEmprestimo,
  registrarDevolucao
};