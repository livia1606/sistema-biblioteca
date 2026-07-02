const jwt = require("jsonwebtoken");

const login = (req, res) => {

    const { email, senha } = req.body;

    // Temporário
    const usuario = {
        id: 1,
        nome: "Administrador",
        email,
        perfil: "ADMIN"
    };

    const token = jwt.sign(
        usuario,
        process.env.JWT_SECRET || "segredo",
        { expiresIn: "1h" }
    );

    res.status(200).json({
        mensagem: "Login realizado com sucesso",
        token,
        usuario
    });

};

module.exports = {
    login
};