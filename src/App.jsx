import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./modulos/home/Home";
import Navbar from "./Navbar";
import Proveedores from "./modulos/proveedor/proveedores";
import MateriaPrima from "./modulos/materiaP/MateriaPrima";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/proveedores" element={<Proveedores/>}></Route>
          <Route path="/materiaPrima" element={<MateriaPrima/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
