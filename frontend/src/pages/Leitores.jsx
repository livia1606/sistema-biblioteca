import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import api from "../services/api";

function Leitores() {
  const [leitores, setLeitores] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
    status: "Ativo",
  });

  useEffect(() => {
    carregarLeitores();
  }, []);

  const carregarLeitores = async () => {
    try {
      const resposta = await api.get("/leitores");
      setLeitores(resposta.data);
    } catch (erro) {
      console.log(erro);
      alert("Erro ao carregar leitores.");
    }
  };

  const alterarCampo = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const limparFormulario = () => {
    setForm({
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      endereco: "",
      status: "Ativo",
    });
    setEditandoId(null);
  };

  const salvarLeitor = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.cpf || !form.email) {
      alert("Preencha pelo menos nome, CPF e e-mail.");
      return;
    }

    try {
      if (editandoId) {
        await api.put(`/leitores/${editandoId}`, form);
        alert("Leitor atualizado com sucesso!");
      } else {
        await api.post("/leitores", form);
        alert("Leitor cadastrado com sucesso!");
      }

      limparFormulario();
      carregarLeitores();
    } catch (erro) {
      console.log(erro);
      alert("Erro ao salvar leitor.");
    }
  };

  const editarLeitor = (leitor) => {
    setEditandoId(leitor.id);

    setForm({
      nome: leitor.nome || "",
      cpf: leitor.cpf || "",
      email: leitor.email || "",
      telefone: leitor.telefone || "",
      endereco: leitor.endereco || "",
      status: leitor.status || "Ativo",
    });
  };

  const excluirLeitor = async (id) => {
    if (!window.confirm("Deseja realmente excluir este leitor?")) return;

    try {
      await api.delete(`/leitores/${id}`);
      alert("Leitor removido com sucesso!");
      carregarLeitores();
    } catch (erro) {
      console.log(erro);
      alert("Erro ao excluir leitor.");
    }
  };

  const leitoresFiltrados = leitores.filter((leitor) => {
    const termo = busca.toLowerCase();

    return (
      leitor.nome?.toLowerCase().includes(termo) ||
      leitor.cpf?.toLowerCase().includes(termo) ||
      leitor.email?.toLowerCase().includes(termo) ||
      leitor.status?.toLowerCase().includes(termo)
    );
  });

  return (
    <section className="crud-page">
      <div className="page-header">
        <p className="page-kicker">Gerenciamento</p>
        <h1>Leitores</h1>
        <span>Cadastre, edite, exclua e consulte leitores.</span>
      </div>

      <div className="crud-card">
        <div className="crud-card-header">
          <div>
            <h2>{editandoId ? "Editar Leitor" : "Cadastrar Leitor"}</h2>
            <p>Preencha os dados principais do leitor.</p>
          </div>
        </div>

        <form className="crud-form" onSubmit={salvarLeitor}>
          <input name="nome" placeholder="Nome" value={form.nome} onChange={alterarCampo} required />
          <input name="cpf" placeholder="CPF" value={form.cpf} onChange={alterarCampo} required />
          <input name="email" placeholder="E-mail" value={form.email} onChange={alterarCampo} required />
          <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={alterarCampo} />
          <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={alterarCampo} />

          <select name="status" value={form.status} onChange={alterarCampo}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>

          <div className="crud-actions">
            <button type="submit">
              {editandoId ? "Salvar alterações" : "Cadastrar leitor"}
            </button>

            {editandoId && (
              <button type="button" className="btn-secondary" onClick={limparFormulario}>
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
            <p>Leitores cadastrados no sistema.</p>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              placeholder="Buscar por nome, CPF, e-mail ou status"
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
                <th>CPF</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {leitoresFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-table">
                    Nenhum leitor cadastrado.
                  </td>
                </tr>
              ) : (
                leitoresFiltrados.map((leitor) => (
                  <tr key={leitor.id}>
                    <td>{leitor.nome}</td>
                    <td>{leitor.cpf}</td>
                    <td>{leitor.email}</td>
                    <td>{leitor.telefone}</td>
                    <td>{leitor.endereco}</td>
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