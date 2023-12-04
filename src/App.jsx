import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./modulos/home/Home";
import Navbar from "./Navbar";
import AuthComponent from "./modulos/login/AuthComponent";
import ProfileComponent from "./modulos/login/ProfileComponent";
import Proveedores from "./modulos/proveedor/Proveedores";
import MateriaPrima from "./modulos/materiaP/MateriaPrima";
import Productos from "./modulos/producto/Productos"
import DetalleP from "./modulos/producto/DetalleP";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<AuthComponent />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/proveedores" element={<Proveedores/>}></Route>
          <Route path="/productos" element={<Productos/>}></Route>
          <Route path="/detalleProducto/:id" element={<DetalleP/>}></Route>
          <Route path="/materiaPrima" element={<MateriaPrima/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
