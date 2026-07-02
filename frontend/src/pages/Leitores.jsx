import { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

function Leitores() {
  const [leitores, setLeitores] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    cpfRa: "",
    email: "",
    telefone: "",
    endereco: "",
    status: "Ativo",
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
      nome: "",
      cpfRa: "",
      email: "",
      telefone: "",
      endereco: "",
      status: "Ativo",
    });

    setEditandoId(null);
  };

  const salvarLeitor = (e) => {
    e.preventDefault();

    if (!form.nome || !form.cpfRa || !form.email) {
      alert("Preencha pelo menos nome, CPF/RA e e-mail.");
      return;
    }

    if (editandoId) {
      const atualizados = leitores.map((leitor) =>
        leitor.id === editandoId ? { ...form, id: editandoId } : leitor
      );

      setLeitores(atualizados);
      limparFormulario();
      return;
    }

    const novoLeitor = {
      ...form,
      id: Date.now(),
    };

    setLeitores([...leitores, novoLeitor]);
    limparFormulario();
  };

  const editarLeitor = (leitor) => {
    setForm(leitor);
    setEditandoId(leitor.id);
  };

  const excluirLeitor = (id) => {
    const confirmar = confirm("Deseja realmente excluir este leitor?");

    if (confirmar) {
      setLeitores(leitores.filter((leitor) => leitor.id !== id));
    }
  };

  const leitoresFiltrados = leitores.filter((leitor) => {
    const termo = busca.toLowerCase();

    return (
      leitor.nome.toLowerCase().includes(termo) ||
      leitor.cpfRa.toLowerCase().includes(termo) ||
      leitor.email.toLowerCase().includes(termo) ||
      leitor.status.toLowerCase().includes(termo)
    );
  });

  return (
    <section className="crud-page">
      <div className="page-header">
        <p className="page-kicker">Gerenciamento</p>
        <h1>Leitores</h1>
        <span>Cadastre, edite, exclua e busque leitores da biblioteca.</span>
      </div>

      <div className="crud-card">
        <div className="crud-card-header">
          <div>
            <h2>{editandoId ? "Editar Leitor" : "Cadastrar Leitor"}</h2>
            <p>Preencha os dados principais do leitor.</p>
          </div>
        </div>

        <form className="crud-form" onSubmit={salvarLeitor}>
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={alterarCampo}
          />

          <input
            name="cpfRa"
            placeholder="CPF ou RA"
            value={form.cpfRa}
            onChange={alterarCampo}
          />

          <input
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={alterarCampo}
          />

          <input
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={alterarCampo}
          />

          <input
            name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={alterarCampo}
          />

          <select name="status" value={form.status} onChange={alterarCampo}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>

          <div className="crud-actions">
            <button type="submit">
              {editandoId ? "Salvar alterações" : "Cadastrar leitor"}
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
            <h2>Lista de Leitores</h2>
            <p>Consulte os leitores cadastrados no sistema.</p>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              placeholder="Buscar por nome, CPF/RA, e-mail ou status"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="crud-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF/RA</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {leitoresFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table">
                    Nenhum leitor cadastrado.
                  </td>
                </tr>
              ) : (
                leitoresFiltrados.map((leitor) => (
                  <tr key={leitor.id}>
                    <td>{leitor.nome}</td>
                    <td>{leitor.cpfRa}</td>
                    <td>{leitor.email}</td>
                    <td>{leitor.telefone}</td>
                    <td>
                      <span className="status-badge">{leitor.status}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => editarLeitor(leitor)}>
                          <FaEdit />
                        </button>

                        <button onClick={() => excluirLeitor(leitor.id)}>
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

export default Leitores;