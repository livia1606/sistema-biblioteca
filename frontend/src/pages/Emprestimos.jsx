import { useState, useEffect } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";
import api from "../services/api";

function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [livros, setLivros] = useState([]);
  const [leitores, setLeitores] = useState([]);
  const [busca, setBusca] = useState("");

  const [form, setForm] = useState({
    readerId: "",
    bookId: "",
    dataEmprestimo: "",
    dataPrevistaDevolucao: "",
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resEmprestimos, resLivros, resLeitores] = await Promise.all([
        api.get("/emprestimos"),
        api.get("/livros"),
        api.get("/leitores"),
      ]);

      setEmprestimos(resEmprestimos.data);
      setLivros(resLivros.data);
      setLeitores(resLeitores.data);
    } catch (erro) {
      console.log(erro);
      alert("Erro ao carregar dados.");
    }
  };

  const alterarCampo = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const limparFormulario = () => {
    setForm({
      readerId: "",
      bookId: "",
      dataEmprestimo: "",
      dataPrevistaDevolucao: "",
    });
  };

  const salvarEmprestimo = async (e) => {
    e.preventDefault();

    if (!form.readerId || !form.bookId || !form.dataEmprestimo || !form.dataPrevistaDevolucao) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await api.post("/emprestimos", {
        readerId: Number(form.readerId),
        bookId: Number(form.bookId),
        dataEmprestimo: form.dataEmprestimo,
        dataPrevistaDevolucao: form.dataPrevistaDevolucao,
      });

      alert("Empréstimo registrado com sucesso!");
      limparFormulario();
      carregarDados();
    } catch (erro) {
      console.log(erro);
      alert("Erro ao registrar empréstimo.");
    }
  };

  const registrarDevolucao = async (id) => {
    try {
      await api.put(`/emprestimos/${id}/devolucao`);
      alert("Devolução registrada com sucesso!");
      carregarDados();
    } catch (erro) {
      console.log(erro);
      alert("Erro ao registrar devolução.");
    }
  };

  const formatarData = (data) => {
    if (!data) return "-";
    return data.split("T")[0];
  };

  const emprestimosFiltrados = emprestimos.filter((emprestimo) => {
    const termo = busca.toLowerCase();

    return (
      emprestimo.Reader?.nome?.toLowerCase().includes(termo) ||
      emprestimo.Book?.titulo?.toLowerCase().includes(termo) ||
      emprestimo.status?.toLowerCase().includes(termo)
    );
  });

  return (
    <section className="crud-page">
      <div className="page-header">
        <p className="page-kicker">Gerenciamento</p>
        <h1>Empréstimos</h1>
        <span>Registre empréstimos e controle devoluções.</span>
      </div>

      <div className="crud-card">
        <div className="crud-card-header">
          <div>
            <h2>Registrar Empréstimo</h2>
            <p>Associe um leitor a um livro.</p>
          </div>
        </div>

        <form className="crud-form" onSubmit={salvarEmprestimo}>
          <select name="readerId" value={form.readerId} onChange={alterarCampo} required>
            <option value="">Selecione o leitor</option>
            {leitores.map((leitor) => (
              <option key={leitor.id} value={leitor.id}>
                {leitor.nome}
              </option>
            ))}
          </select>

          <select name="bookId" value={form.bookId} onChange={alterarCampo} required>
            <option value="">Selecione o livro</option>
            {livros.map((livro) => (
              <option key={livro.id} value={livro.id}>
                {livro.titulo}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="dataEmprestimo"
            value={form.dataEmprestimo}
            onChange={alterarCampo}
            required
          />

          <input
            type="date"
            name="dataPrevistaDevolucao"
            value={form.dataPrevistaDevolucao}
            onChange={alterarCampo}
            required
          />

          <div className="crud-actions">
            <button type="submit">Registrar empréstimo</button>
          </div>
        </form>
      </div>

      <div className="crud-card">
        <div className="crud-card-header">
          <div>
            <h2>Lista de Empréstimos</h2>
            <p>Consulte empréstimos e registre devoluções.</p>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              placeholder="Buscar por leitor, livro ou status"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="crud-table">
            <thead>
              <tr>
                <th>Leitor</th>
                <th>Livro</th>
                <th>Empréstimo</th>
                <th>Prevista</th>
                <th>Devolução</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {emprestimosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-table">
                    Nenhum empréstimo registrado.
                  </td>
                </tr>
              ) : (
                emprestimosFiltrados.map((emprestimo) => (
                  <tr key={emprestimo.id}>
                    <td>{emprestimo.Reader?.nome || "-"}</td>
                    <td>{emprestimo.Book?.titulo || "-"}</td>
                    <td>{formatarData(emprestimo.dataEmprestimo)}</td>
                    <td>{formatarData(emprestimo.dataPrevistaDevolucao)}</td>
                    <td>{formatarData(emprestimo.dataDevolucao)}</td>
                    <td>
                      <span className="status-badge">{emprestimo.status}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        {emprestimo.status !== "DEVOLVIDO" && (
                          <button onClick={() => registrarDevolucao(emprestimo.id)}>
                            <FaCheck />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Emprestimos;