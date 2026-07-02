import {
  FaBookOpen,
  FaHome,
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";

function Navbar({ paginaAtual, setPaginaAtual, sair }) {
  const perfil = localStorage.getItem("perfil");

  return (
    <aside className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">
          <FaBookOpen />
        </div>

        <div>
          <h2>Biblioteca</h2>
          <p>Sistema de Gerenciamento</p>
        </div>
      </div>

      <nav className="navbar-menu">
        <button
          className={paginaAtual === "dashboard" ? "active" : ""}
          onClick={() => setPaginaAtual("dashboard")}
        >
          <FaHome />
          Dashboard
        </button>

        {(perfil === "ADMIN" || perfil === "BIBLIOTECARIO" || perfil === "LEITOR") && (
          <button
            className={paginaAtual === "livros" ? "active" : ""}
            onClick={() => setPaginaAtual("livros")}
          >
            <FaBook />
            Livros
          </button>
        )}

        {(perfil === "ADMIN" || perfil === "BIBLIOTECARIO") && (
          <>
            <button
              className={paginaAtual === "leitores" ? "active" : ""}
              onClick={() => setPaginaAtual("leitores")}
            >
              <FaUsers />
              Leitores
            </button>

            <button
              className={paginaAtual === "emprestimos" ? "active" : ""}
              onClick={() => setPaginaAtual("emprestimos")}
            >
              <FaExchangeAlt />
              Empréstimos
            </button>
          </>
        )}

        {perfil === "ADMIN" && (
          <button
            className={paginaAtual === "usuarios" ? "active" : ""}
            onClick={() => setPaginaAtual("usuarios")}
          >
            <FaUserCog />
            Usuários
          </button>
        )}
      </nav>

      <button className="navbar-logout" onClick={sair}>
        <FaSignOutAlt />
        Sair
      </button>
    </aside>
  );
}

export default Navbar;