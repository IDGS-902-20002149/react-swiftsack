import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./modulos/home/Home";
import Navbar from "./Navbar";
import Proveedores from "./modulos/proveedor/proveedores";
import MateriaPrima from "./modulos/materiaP/MateriaPrima";
import Compra from "./modulos/Compra/Compra";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/proveedores" element={<Proveedores/>}></Route>
          <Route path="/materiaPrima" element={<MateriaPrima/>}></Route>
          <Route path="/compra" element={<Compra/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
