// Controller de Leitores

const listarLeitores = (req, res) => {
    res.status(200).json({
        mensagem: "Listando todos os leitores"
    });
};

const cadastrarLeitor = (req, res) => {
    res.status(201).json({
        mensagem: "Leitor cadastrado com sucesso"
    });
};

const editarLeitor = (req, res) => {
    res.status(200).json({
        mensagem: `Leitor ${req.params.id} atualizado`
    });
};

const excluirLeitor = (req, res) => {
    res.status(200).json({
        mensagem: `Leitor ${req.params.id} removido`
    });
};

module.exports = {
    listarLeitores,
    cadastrarLeitor,
    editarLeitor,
    excluirLeitor
};