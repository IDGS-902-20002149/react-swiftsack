import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';

const PedidosCComponent = () => {
  const [pedido, setPedido] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const { id } = useParams();

  const getStatusText = (estatus) => {
    switch (estatus) {
      case 0:
        return 'En proceso';
      case 1:
        return 'Empacando';
      case 2:
        return 'Enviado';
      case 3:
        return 'Llegó al punto de recolección';
      case 4:
        return 'En proceso de entrega';
      case 5:
        return 'Entregado';
      default:
        return 'Desconocido';
    }
  };

  const obtenerPedido = async () => {
    try {
      const responsePedido = await axios.get(`https://localhost:7267/api/Pedido/${id}`);
      setPedido(responsePedido.data);
      console.log('Pedido cargado correctamente:', responsePedido.data);

      // Obtener información de dirección
      const responseDireccion = await axios.get(`https://localhost:7267/api/Direccion/${responsePedido.data.idDireccion}`);
      setDireccion(responseDireccion.data);
      console.log('Dirección cargada correctamente:', responseDireccion.data);
    } catch (error) {
      console.log('Error al cargar el pedido o dirección:', error);
    }
  };

  useEffect(() => {
    obtenerPedido();
  }, [id]);

  if (!pedido || !direccion) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={styles.card}>
      <p><b>Folio:</b> {pedido.folio}</p>
      <p><b>Fecha:</b> {new Date(pedido.fecha).toLocaleString()}</p>
      <p><b>Estatus:</b> {getStatusText(pedido.estatus)}</p>
      <p><b>Dirección:</b> {direccion.calleNumero}, {direccion.codigoPostal}</p>
      <ProgressBar now={pedido.estatus * 20} label={`${pedido.estatus * 20}%`} />
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px 0',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    marginTop: '80px',
  },
};

export default PedidosCComponent;
