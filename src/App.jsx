import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./modulos/home/Home";
import Navbar from "./Navbar";
import AuthComponent from "./modulos/login/AuthComponent";
import ProfileComponent from "./modulos/login/ProfileComponent";
import PedidosMainCComponent from "./modulos/pedidos/PedidosMainCComponent";
import PedidosCComponent from "./modulos/pedidos/PedidosCComponent";
import LogoutComponent from "./modulos/login/LogoutComponent";
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
          <Route path="/pedidos" element={<PedidosMainCComponent />} /> {/* Agregado */}
          <Route path="/ver-detalle/:id" element={<PedidosCComponent/>} />
          <Route path="/logout" element={<LogoutComponent />} /> {/* Agrega esta línea */}
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
