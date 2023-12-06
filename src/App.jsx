import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./modulos/home/Home";
import Navbar from "./Navbar";
import AuthComponent from "./modulos/login/AuthComponent";
import ProfileComponent from "./modulos/login/ProfileComponent";
import Productos from "./modulos/producto/Productos";
import DetalleP from "./modulos/producto/DetalleP";
import Carrito from "./modulos/carrito/Carrito";
import GoToPay from "./modulos/carrito/GoToPay";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<AuthComponent />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/productos" element={<Productos />}></Route>
          <Route path="/detalleProducto/:id" element={<DetalleP />}></Route>
          <Route path="/shopping-car" element={<Carrito />}></Route>
          <Route path="/GoToPay" element={<GoToPay />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
