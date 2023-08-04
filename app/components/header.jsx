import { Link } from "@remix-run/react";
import Logo from "../../public/img/logo.svg";
import Navegacion from "./navegacion";

function Header() {
  return (
    <header className="header">
      <div className="contenedor barra">
        <div className="logo">
          <Link to="/index">
            <img className="logo" src={Logo} alt="Imagen Logo" />
          </Link>
        </div>
        <Navegacion />
      </div>
    </header>
  );
}

export default Header;
