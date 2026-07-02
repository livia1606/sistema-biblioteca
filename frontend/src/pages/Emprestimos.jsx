import { useState } from "react";
import { FaCheck, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    leitor: "",
    livro: "",
    dataEmprestimo: "",
    dataPrevista: "",
    dataDevolucao: "",
    status: "Em aberto",
  });

  const alterarCampo = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const limparFormulario = () => {
    setForm({
      leitor: "",
      livro: "",
      dataEmprestimo: "",
      dataPrevista: "",
      dataDevolucao: "",
      status: "Em aberto",
    });

    setEditandoId(null);
  };

  const salvarEmprestimo = (e) => {
    e.preventDefault();

    if (!form.leitor || !form.livro || !form.dataEmprestimo || !form.dataPrevista) {
      alert("Preencha leitor, livro, data do empréstimo e data prevista.");
      return;
    }

    if (editandoId) {
      const atualizados = emprestimos.map((emprestimo) =>
        emprestimo.id === editandoId ? { ...form, id: editandoId } : emprestimo
      );

      setEmprestimos(atualizados);
      limparFormulario();
      return;
    }

    const novoEmprestimo = {
      ...form,
      id: Date.now(),
    };

    setEmprestimos([...emprestimos, novoEmprestimo]);
    limparFormulario();
  };

  const editarEmprestimo = (emprestimo) => {
    setForm(emprestimo);
    setEditandoId(emprestimo.id);
  };

  const excluirEmprestimo = (id) => {
    const confirmar = confirm("Deseja realmente excluir este empréstimo?");

    if (confirmar) {
      setEmprestimos(emprestimos.filter((emprestimo) => emprestimo.id !== id));
    }
  };

  const registrarDevolucao = (id) => {
    const hoje = new Date().toISOString().split("T")[0];

    const atualizados = emprestimos.map((emprestimo) =>
      emprestimo.id === id
        ? {
            ...emprestimo,
            dataDevolucao: hoje,
            status: "Devolvido",
          }
        : emprestimo
    );

    setEmprestimos(atualizados);
  };

  const emprestimosFiltrados = emprestimos.filter((emprestimo) => {
    const termo = busca.toLowerCase();

    return (
      emprestimo.leitor.toLowerCase().includes(termo) ||
      emprestimo.livro.toLowerCase().includes(termo) ||
      emprestimo.status.toLowerCase().includes(termo) ||
      emprestimo.dataEmprestimo.toLowerCase().includes(termo) ||
      emprestimo.dataPrevista.toLowerCase().includes(termo)
    );
  });

  return (
    <section className="crud-page">
      <div className="page-header">
        <p className="page-kicker">Gerenciamento</p>
        <h1>Empréstimos</h1>
        <span>
          Registre empréstimos, acompanhe prazos e controle devoluções.
        </span>
      </div>

      <div className="crud-card">
        <div className="crud-card-header">
          <div>
            <h2>{editandoId ? "Editar Empréstimo" : "Registrar Empréstimo"}</h2>
            <p>Associe um leitor a um livro e informe os prazos.</p>
          </div>
        </div>

        <form className="crud-form" onSubmit={salvarEmprestimo}>
          <input
            name="leitor"
            placeholder="Leitor"
            value={form.leitor}
            onChange={alterarCampo}
          />

          <input
            name="livro"
            placeholder="Livro"
            value={form.livro}
            onChange={alterarCampo}
          />

          <input
            type="date"
            name="dataEmprestimo"
            value={form.dataEmprestimo}
            onChange={alterarCampo}
          />

          <input
            type="date"
            name="dataPrevista"
            value={form.dataPrevista}
            onChange={alterarCampo}
          />

          <input
            type="date"
            name="dataDevolucao"
            value={form.dataDevolucao}
            onChange={alterarCampo}
          />

          <select name="status" value={form.status} onChange={alterarCampo}>
            <option value="Em aberto">Em aberto</option>
            <option value="Devolvido">Devolvido</option>
            <option value="Atrasado">Atrasado</option>
          </select>

          <div className="crud-actions">
            <button type="submit">
              {editandoId ? "Salvar alterações" : "Registrar empréstimo"}
            </button>

            {editandoId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={limparFormulario}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="crud-card">
        <div className="crud-card-header">
          <div>
            <h2>Lista de Empréstimos</h2>
            <p>Consulte o histórico e registre devoluções.</p>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              placeholder="Buscar por leitor, livro, status ou data"
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
                    <td>{emprestimo.leitor}</td>
                    <td>{emprestimo.livro}</td>
                    <td>{emprestimo.dataEmprestimo}</td>
                    <td>{emprestimo.dataPrevista}</td>
                    <td>{emprestimo.dataDevolucao || "-"}</td>
                    <td>
                      <span className="status-badge">{emprestimo.status}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => registrarDevolucao(emprestimo.id)}>
                          <FaCheck />
                        </button>

                        <button onClick={() => editarEmprestimo(emprestimo)}>
                          <FaEdit />
                        </button>

                        <button onClick={() => excluirEmprestimo(emprestimo.id)}>
                          <FaTrash />
                        </button>
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