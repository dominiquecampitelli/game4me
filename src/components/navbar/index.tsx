import logo from "../../assets/images/logo.png";

import "./styles.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="game4me logo" className="navbar-logo" />

        <ul className="navbar-links">
          <li>Home</li>
          <li>Jogos</li>
          <li>Categorias</li>
          <li>Carrinho</li>
        </ul>
      </div>
    </nav>
  );
}
