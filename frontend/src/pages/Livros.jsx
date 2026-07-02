import { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

function Livros() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    editora: "",
    anoPublicacao: "",
    categoria: "",
    isbn: "",
    quantidadeTotal: "",
    quantidadeDisponivel: "",
    status: "Disponível",
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
      titulo: "",
      autor: "",
      editora: "",
      anoPublicacao: "",
      categoria: "",
      isbn: "",
      quantidadeTotal: "",
      quantidadeDisponivel: "",
      status: "Disponível",
    });

    setEditandoId(null);
  };

  const salvarLivro = (e) => {
    e.preventDefault();

    if (!form.titulo || !form.autor || !form.isbn) {
      alert("Preencha pelo menos título, autor e ISBN.");
      return;
    }

    if (editandoId) {
      const atualizados = livros.map((livro) =>
        livro.id === editandoId ? { ...form, id: editandoId } : livro
      );

      setLivros(atualizados);
      limparFormulario();
      return;
    }

    const novoLivro = {
      ...form,
      id: Date.now(),
    };

    setLivros([...livros, novoLivro]);
    limparFormulario();
  };

  const editarLivro = (livro) => {
    setForm(livro);
    setEditandoId(livro.id);
  };

  const excluirLivro = (id) => {
    const confirmar = confirm("Deseja realmente excluir este livro?");

    if (confirmar) {
      setLivros(livros.filter((livro) => livro.id !== id));
    }
  };

  const livrosFiltrados = livros.filter((livro) => {
    const termo = busca.toLowerCase();

    return (
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autor.toLowerCase().includes(termo) ||
      livro.categoria.toLowerCase().includes(termo) ||
      livro.status.toLowerCase().includes(termo)
    );
  });

  return (
    <section className="crud-page">
      <div className="page-header">
        <p className="page-kicker">Gerenciamento</p>
        <h1>Livros</h1>
        <span>Cadastre, edite, exclua e busque livros do acervo.</span>
      </div>

      <div className="crud-card">
        <div className="crud-card-header">
          <div>
            <h2>{editandoId ? "Editar Livro" : "Cadastrar Livro"}</h2>
            <p>Preencha os dados principais do livro.</p>
          </div>
        </div>

        <form className="crud-form" onSubmit={salvarLivro}>
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={alterarCampo}
          />

          <input
            name="autor"
            placeholder="Autor"
            value={form.autor}
            onChange={alterarCampo}
          />

          <input
            name="editora"
            placeholder="Editora"
            value={form.editora}
            onChange={alterarCampo}
          />

          <input
            name="anoPublicacao"
            placeholder="Ano de publicação"
            value={form.anoPublicacao}
            onChange={alterarCampo}
          />

          <input
            name="categoria"
            placeholder="Categoria"
            value={form.categoria}
            onChange={alterarCampo}
          />

          <input
            name="isbn"
            placeholder="ISBN"
            value={form.isbn}
            onChange={alterarCampo}
          />

          <input
            name="quantidadeTotal"
            placeholder="Quantidade total"
            value={form.quantidadeTotal}
            onChange={alterarCampo}
          />

          <input
            name="quantidadeDisponivel"
            placeholder="Quantidade disponível"
            value={form.quantidadeDisponivel}
            onChange={alterarCampo}
          />

          <select name="status" value={form.status} onChange={alterarCampo}>
            <option value="Disponível">Disponível</option>
            <option value="Indisponível">Indisponível</option>
          </select>

          <div className="crud-actions">
            <button type="submit">
              {editandoId ? "Salvar alterações" : "Cadastrar livro"}
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
            <h2>Lista de Livros</h2>
            <p>Consulte os livros cadastrados no sistema.</p>
          </div>

          <div className="search-box">
            <FaSearch />
            <input
              placeholder="Buscar por título, autor, categoria ou status"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="crud-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>ISBN</th>
                <th>Disponível</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {livrosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-table">
                    Nenhum livro cadastrado.
                  </td>
                </tr>
              ) : (
                livrosFiltrados.map((livro) => (
                  <tr key={livro.id}>
                    <td>{livro.titulo}</td>
                    <td>{livro.autor}</td>
                    <td>{livro.categoria}</td>
                    <td>{livro.isbn}</td>
                    <td>{livro.quantidadeDisponivel}</td>
                    <td>
                      <span className="status-badge">{livro.status}</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => editarLivro(livro)}>
                          <FaEdit />
                        </button>

                        <button onClick={() => excluirLivro(livro.id)}>
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

export default Livros;