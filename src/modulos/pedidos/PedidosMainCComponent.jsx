import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PedidoCard = ({ pedido }) => {
  const getStatusText = (estatus) => {
    switch (estatus) {
      case 0:
        return "En proceso";
      case 1:
        return "Empacando";
      case 2:
        return "Enviado";
      case 3:
        return "Llegó al punto de recolección";
      case 4:
        return "En proceso de entrega";
      case 5:
        return "Entregado";
      default:
        return "Desconocido";
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="col-5">
        <div style={styles.card}>
          <p>
            <b>Folio:</b> {pedido.folio}
          </p>
          <p>
            <b>Fecha:</b> {new Date(pedido.fecha).toLocaleString()}
          </p>
          <p>
            <b>Estatus:</b> {getStatusText(pedido.estatus)}
          </p>
          <Link to={`/ver-detalle/${pedido.id}`}>
            <button style={styles.button}>Ver Detalles</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    margin: "10px 0",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    marginTop: "40px",
  },
  button: {
    marginTop: "10px",
    padding: "5px 10px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const PedidosMainCComponent = () => {
  const [pedidos, setPedidos] = useState([]);
  const [usuario, setUsuario] = useState({
    id: 0,
    name: "0",
    email: "0",
    password: "0",
    telefono: "0",
    active: false,
    confirmed_at: "0",
    roleId: 0,
  });

  const obtenerMisPedidos = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7267/api/Pedido/obtener-mis-pedidos/${usuario.id}`
      );
      setPedidos(response.data);
      console.log("Pedidos cargados correctamente:", response.data);
    } catch (error) {
      console.log("Error al cargar pedidos:", error);
    }
  };

  const obtenerUsuario = async () => {
    const userData = sessionStorage.getItem("userData");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log("Usuario: " + parsedUserData.name + " recuperado");
      setUsuario(parsedUserData);
    } else {
      console.log("El objeto no fue encontrado en sessionStorage.");
    }
  };

  useEffect(() => {
    obtenerUsuario();
  }, []);

  useEffect(() => {
    console.log("Usuario actual:", usuario);
    if (usuario.id === 0) {
      console.log("Esperando carga completa del usuario.");
      return;
    }

    if (usuario.roleId !== 3) {
      console.log("Redirigir a la página de inicio");
      return;
    }

    obtenerMisPedidos();
  }, [usuario]);

  return (
    <div>
      <h2>Mis Pedidos</h2>
      {pedidos.map((pedido) => (
        <div key={pedido.id}>
          <PedidoCard pedido={pedido} />
        </div>
      ))}
    </div>
  );
};

export default PedidosMainCComponent;
