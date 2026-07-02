import { FaBook, FaUsers, FaExchangeAlt, FaHandPointUp } from "react-icons/fa";

function Dashboard() {
  return (
    <section className="dashboard-page">
      <div className="dashboard-main-card">
        <div className="dashboard-text">
          <p className="page-kicker">Bem-vinda ao Sistema</p>

          <h1>Biblioteca</h1>

          <p className="dashboard-description">
            Este sistema foi desenvolvido para facilitar o gerenciamento da
            biblioteca, permitindo o cadastro e a consulta de livros, o
            gerenciamento de leitores e o controle de empréstimos e devoluções
            de forma prática, organizada e segura.
          </p>

          <div className="dashboard-info">
            <strong>Funcionalidades do Sistema</strong>

            <span>
              Utilize o menu superior para acessar as páginas de Livros,
              Leitores e Empréstimos e realizar todas as operações disponíveis.
            </span>
          </div>

          
        </div>
      </div>

      <div className="dashboard-shortcuts">
        <article>
          <FaBook />
          <h3>Livros</h3>
          <p>Cadastre, consulte, edite e exclua livros do acervo.</p>
        </article>

        <article>
          <FaUsers />
          <h3>Leitores</h3>
          <p>Gerencie os leitores cadastrados e acompanhe seus dados.</p>
        </article>

        <article>
          <FaExchangeAlt />
          <h3>Empréstimos</h3>
          <p>Controle empréstimos, devoluções e disponibilidade dos livros.</p>
        </article>
      </div>
    </section>
  );
}

export default Dashboard;