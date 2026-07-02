import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import api from "../services/api";

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
  });

  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async () => {
    try {
      const resposta = await api.get("/livros");
      setLivros(resposta.data);
    } catch (erro) {
      console.log(erro);
      alert("Erro ao carregar livros.");
    }
  };

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
    });

    setEditandoId(null);
  };

  const salvarLivro = async (e) => {
    e.preventDefault();

    try {
      if (!form.titulo || !form.autor || !form.isbn) {
        alert("Preencha título, autor e ISBN.");
        return;
      }

      const dados = {
        ...form,
        anoPublicacao: Number(form.anoPublicacao),
        quantidadeTotal: Number(form.quantidadeTotal),
        quantidadeDisponivel: Number(form.quantidadeDisponivel),
      };

      if (editandoId) {
        await api.put(`/livros/${editandoId}`, dados);
        alert("Livro atualizado com sucesso!");
      } else {
        await api.post("/livros", dados);
        alert("Livro cadastrado com sucesso!");
      }

      limparFormulario();
      carregarLivros();
    } catch (erro) {
      console.log(erro);
      alert("Erro ao salvar livro.");
    }
  };

  const editarLivro = (livro) => {
    setEditandoId(livro.id);

    setForm({
      titulo: livro.titulo,
      autor: livro.autor,
      editora: livro.editora || "",
      anoPublicacao: livro.anoPublicacao || "",
      categoria: livro.categoria || "",
      isbn: livro.isbn || "",
      quantidadeTotal: livro.quantidadeTotal || "",
      quantidadeDisponivel: livro.quantidadeDisponivel || "",
    });
  };

  const excluirLivro = async (id) => {
    if (!window.confirm("Deseja realmente excluir este livro?")) return;

    try {
      await api.delete(`/livros/${id}`);

      alert("Livro removido com sucesso!");

      carregarLivros();
    } catch (erro) {
      console.log(erro);
      alert("Erro ao excluir livro.");
    }
  };

  const livrosFiltrados = livros.filter((livro) => {
    const termo = busca.toLowerCase();

    return (
      livro.titulo?.toLowerCase().includes(termo) ||
      livro.autor?.toLowerCase().includes(termo) ||
      livro.categoria?.toLowerCase().includes(termo)
    );
  });

  return (
    <section className="crud-page">
      <div className="page-header">
        <p className="page-kicker">Gerenciamento</p>
        <h1>Livros</h1>
        <span>Cadastre, edite, exclua e consulte os livros.</span>
      </div>

      <div className="crud-card">
        <div className="crud-card-header">
          <div>
            <h2>
              {editandoId ? "Editar Livro" : "Cadastrar Livro"}
            </h2>
            <p>Preencha os dados do livro.</p>
          </div>
        </div>

        <form className="crud-form" onSubmit={salvarLivro}>
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={alterarCampo}
            required
          />

          <input
            name="autor"
            placeholder="Autor"
            value={form.autor}
            onChange={alterarCampo}
            required
          />

          <input
            name="editora"
            placeholder="Editora"
            value={form.editora}
            onChange={alterarCampo}
          />

          <input
            type="number"
            name="anoPublicacao"
            placeholder="Ano"
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
            required
          />

          <input
            type="number"
            name="quantidadeTotal"
            placeholder="Quantidade Total"
            value={form.quantidadeTotal}
            onChange={alterarCampo}
          />

          <input
            type="number"
            name="quantidadeDisponivel"
            placeholder="Quantidade Disponível"
            value={form.quantidadeDisponivel}
            onChange={alterarCampo}
          />

          <div className="crud-actions">
            <button type="submit">
              {editandoId
                ? "Salvar alterações"
                : "Cadastrar Livro"}
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
            <h2>Lista de Livros</h2>
            <p>Livros cadastrados no sistema.</p>
          </div>

          <div className="search-box">
            <FaSearch />

            <input
              placeholder="Buscar livro..."
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
                <th>Total</th>
                <th>Disponível</th>
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
                    <td>{livro.quantidadeTotal}</td>
                    <td>{livro.quantidadeDisponivel}</td>

                    <td>
                      <div className="table-actions">
                        <button
                          onClick={() => editarLivro(livro)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => excluirLivro(livro.id)}
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

export default Livros;