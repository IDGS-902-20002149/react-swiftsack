import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./modulos/home/Home";
import Navbar from "./Navbar";
import Proveedores from "./modulos/proveedor/Proveedores";
import MateriaPrima from "./modulos/materiaP/MateriaPrima";
import Tarjeta from "./modulos/tarjeta/Tarjeta";
import Direccion from "./modulos/direccion/Direccion";
import Carrito from "./modulos/carrito/Carrito";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/proveedores" element={<Proveedores />}></Route>
          <Route path="/materiaPrima" element={<MateriaPrima />}></Route>
          <Route path="/direccion" element={<Direccion />}></Route>
          <Route path="/tarjeta" element={<Tarjeta />}></Route>
          <Route path="/carrito" element={<Carrito />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
