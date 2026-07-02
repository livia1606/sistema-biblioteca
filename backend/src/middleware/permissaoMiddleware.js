function permitirPerfis(...perfisPermitidos) {
  return (req, res, next) => {
    if (!perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({ mensagem: "Acesso negado" });
    }

    next();
  };
}

module.exports = permitirPerfis;