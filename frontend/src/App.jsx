import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Livros from "./pages/Livros";
import Leitores from "./pages/Leitores";
import Emprestimos from "./pages/Emprestimos";

import Navbar from "./components/Navbar";

function App() {
  const [logado, setLogado] = useState(!!localStorage.getItem("token"));
  const [paginaAtual, setPaginaAtual] = useState("dashboard");

  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setLogado(false);
  };

  if (!logado) {
    return <Login setLogado={setLogado} />;
  }

  return (
    <div className="sistema">
      <Navbar
        paginaAtual={paginaAtual}
        setPaginaAtual={setPaginaAtual}
        sair={sair}
      />

      <main className="conteudo">
        {paginaAtual === "dashboard" && <Dashboard />}

        {paginaAtual === "livros" && <Livros />}

        {paginaAtual === "leitores" && <Leitores />}

        {paginaAtual === "emprestimos" && <Emprestimos />}
      </main>
    </div>
  );
}

export default App;