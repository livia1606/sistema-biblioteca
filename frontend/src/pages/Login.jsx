import { useState } from "react";
import { FaBookOpen, FaEnvelope, FaLock } from "react-icons/fa";
import api from "../services/api";

function Login({ setLogado }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await api.post("/auth/login", {
        email,
        senha,
      });

      localStorage.setItem("token", resposta.data.token);
      localStorage.setItem("usuario", JSON.stringify(resposta.data.usuario));

      setLogado(true);

      alert("Login realizado com sucesso!");
    } catch (erro) {
      alert("Erro ao realizar login.");
      console.log(erro);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo">
          <FaBookOpen />
        </div>

        <h1 className="login-title">Biblioteca</h1>
        <p className="login-kicker">Sistema de Gerenciamento</p>

        <div className="login-divider">
          <FaBookOpen />
        </div>

        <div className="login-welcome">
          <h2>Bem-vindo!</h2>
          <p>Faça login para acessar o sistema</p>
        </div>

        <form className="login-form" onSubmit={fazerLogin}>
          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Lembrar-me
            </label>

            <a href="#">Esqueci minha senha</a>
          </div>

          <button className="login-button" type="submit">
            Entrar no sistema
          </button>
        </form>

        <div className="login-access">
          <p className="login-access-title">Acesso para</p>

          <div className="login-access-items">
            <div className="login-access-item">Administrador</div>
            <div className="login-access-item">Bibliotecário</div>
            <div className="login-access-item">Leitor</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;