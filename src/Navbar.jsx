import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    // Redirigir a la ruta de resultados con el término de búsqueda en la URL
    navigate(`/`);
  };

  const handleProveedores = () => {
      // Redirigir a la ruta de resultados con el término de búsqueda en la URL
      navigate(`/proveedores`);
    };

  const handleProductos = () => {
      // Redirigir a la ruta de resultados con el término de búsqueda en la URL
      navigate(`/productos`);
    };

  const handleMateria = () => {
    // Redirigir a la ruta de resultados con el término de búsqueda en la URL
    navigate(`/materiaPrima`);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand p-0" href="#">
            <img
              src="/src/assets/img/swiftsack_logo_letras.png"
              alt=""
              width="100px"
            />
          </a>
          <button onClick={handleHome} className="navbar-toggler" type="button">
            <span className="btn btn-dark"> HOME </span>
          </button>
          <button onClick={handleProveedores} className="navbar-toggler" type="button">
            <span className="btn btn-dark"> PROVEEDORES </span>
          </button>
          <button onClick={handleMateria} className="navbar-toggler" type="button">
            <span className="btn btn-dark"> MATERIA PRIMA </span>
          </button>
          <button onClick={handleProductos} className="navbar-toggler" type="button">
            <span className="btn btn-dark"> PRODUCTOS </span>
          </button>
          <button className="navbar-toggler" type="button">
            <Link to="/login" className="btn btn-dark"> LOGIN </Link>
          </button>
          <button className="navbar-toggler" type="button">
            <Link to="/profile" className="btn btn-dark"> PERFIL </Link>
          </button>

          <button className="navbar-toggler" type="button">
            <Link to="/pedidos" className="btn btn-dark"> PEDIDOS </Link>
          </button>
          <button className="navbar-toggler" type="button">
          <Link to="/logout" className="btn btn-dark">Cerrar Sesión</Link>
          </button>






          <div
            className="offcanvas offcanvas-start text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                SwiftSack
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href='/productos'>
                    Productos
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Perfil
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
