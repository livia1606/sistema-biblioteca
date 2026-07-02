const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "Token não informado" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "segredo", (erro, usuario) => {
    if (erro) {
      return res.status(403).json({ mensagem: "Token inválido" });
    }

    req.usuario = usuario;
    next();
  });
}

module.exports = autenticarToken;