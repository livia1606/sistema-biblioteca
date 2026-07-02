// Controller de Livros

const listarLivros = (req, res) => {
    res.status(200).json({
        mensagem: "Listando todos os livros"
    });
};

const cadastrarLivro = (req, res) => {
    res.status(201).json({
        mensagem: "Livro cadastrado com sucesso"
    });
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