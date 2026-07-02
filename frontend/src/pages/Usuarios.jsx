import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import api from "../services/api";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    perfil: "LEITOR",
  });

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const resposta = await api.get("/usuarios");
      setUsuarios(resposta.data);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao carregar usuários.");
    }
  };

  const alterarCampo = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const limparFormulario = () => {
    setForm({
      nome: "",
      email: "",
      senha: "",
      perfil: "LEITOR",
    });

    setEditandoId(null);
  };

  const salvarUsuario = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        const dados = {
          nome: form.nome,
          email: form.email,
          perfil: form.perfil,
        };

        if (form.senha.trim() !== "") {
          dados.senha = form.senha;
        }

        await api.put(`/usuarios/${editandoId}`, dados);

        alert("Usuário atualizado com sucesso!");
      } else {
        await api.post("/usuarios", form);
        alert("Usuário cadastrado com sucesso!");
      }

      limparFormulario();
      carregarUsuarios();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao salvar usuário.");
    }
  };

  const editarUsuario = (usuario) => {
    setEditandoId(usuario.id);

    setForm({
      nome: usuario.nome,
      email: usuario.email,
      senha: "",
      perfil: usuario.perfil,
    });
  };

  const excluirUsuario = async (id) => {
    if (!window.confirm("Deseja excluir este usuário?")) return;

    try {
      await api.delete(`/usuarios/${id}`);
      alert("Usuário removido com sucesso!");
      carregarUsuarios();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao excluir usuário.");
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const termo = busca.toLowerCase();

    return (
      usuario.nome?.toLowerCase().includes(termo) ||
      usuario.email?.toLowerCase().includes(termo) ||
      usuario.perfil?.toLowerCase().includes(termo)
    );
  });

  return (
    <section className="crud-page">
      <div className="page-header">
        <p className="page-kicker">Administração</p>
        <h1>Usuários</h1>
        <span>Gerencie os usuários do sistema.</span>
      </div>

      <div className="crud-card">
        <div className="crud-card-header">
          <div>
            <h2>{editandoId ? "Editar Usuário" : "Cadastrar Usuário"}</h2>
            <p>Preencha os dados abaixo.</p>
          </div>
        </div>

        <form className="crud-form" onSubmit={salvarUsuario}>
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={alterarCampo}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={alterarCampo}
            required
          />

          <input
            name="senha"
            type="password"
            placeholder={
              editandoId
                ? "Nova senha (opcional)"
                : "Senha"
            }
            value={form.senha}
            onChange={alterarCampo}
            required={!editandoId}
          />

          <select
            name="perfil"
            value={form.perfil}
            onChange={alterarCampo}
          >
            <option value="ADMIN">Administrador</option>
            <option value="BIBLIOTECARIO">Bibliotecário</option>
            <option value="LEITOR">Leitor</option>
          </select>

          <div className="crud-actions">
            <button type="submit">
              {editandoId
                ? "Salvar alterações"
                : "Cadastrar usuário"}
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
            <h2>Lista de Usuários</h2>
            <p>Usuários cadastrados.</p>
          </div>

          <div className="search-box">
            <FaSearch />

            <input
              placeholder="Buscar usuário..."
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
                <th>E-mail</th>
                <th>Perfil</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-table">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.perfil}</td>

                    <td>
                      <div className="table-actions">
                        <button
                          onClick={() => editarUsuario(usuario)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => excluirUsuario(usuario.id)}
                        >
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

export default Usuarios;