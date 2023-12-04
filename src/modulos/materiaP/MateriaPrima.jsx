/* eslint-disable no-unused-vars */
import './MateriaPrima.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const MateriaPrima = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [materiaPrima, setMateriaPrima] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMateriaPrima, setSelectedMateriaPrima] = useState(null);
  const [newMateriaPrima, setNewMateriaPrima] = useState({
    id: 0,
    nombre: '',
    cantidad: 0,
    unidadMedida: '',
    costo: 0,
    idProveedor: 0,
    estatus: true,
  });

  useEffect(() => {
    const apiUrl = 'https://localhost:7267/api/MateriaP';
    axios.get(apiUrl)
      .then(response => setMateriaPrima(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = () => {
    const apiUrl = `https://localhost:7267/api/MateriaP/${searchTerm}`;

    axios.get(apiUrl)
      .then(response => setMateriaPrima(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewMateriaPrima({
      id: 0,
      nombre: '',
      cantidad: 0,
      unidadMedida: '',
      costo: 0,
      idProveedor: 0,
      estatus: true,
    });
  };


  const handleEdit = (id) => {
    // Buscar el proveedor correspondiente en la lista
    const selected = materiaPrima.find((materia) => materia.id === id);
  
    // Establecer el proveedor seleccionado en el estado
    setSelectedMateriaPrima(selected);
  
    // Mostrar el modal de edición
    setShowModal(true);
  };

  const handleUpdate = () => {
    // Lógica para actualizar el proveedor
    const apiUrl = `https://localhost:7267/api/MateriaP/${selectedMateriaPrima.id}`;
  
    axios.put(apiUrl, selectedMateriaPrima)
      .then(response => {
        console.log('Proveedor actualizado con éxito:', response.data);
        
  
        // Limpiar el proveedor seleccionado después de la actualización
        setSelectedMateriaPrima(null);
      })
      .catch(error => {
       
        handleCloseModal();

        const apiUrl = 'https://localhost:7267/api/MateriaP';
        axios.get(apiUrl)
        .then(response => setMateriaPrima(response.data))
        .catch(error => console.error('Error fetching data:', error));
            // Limpiar el proveedor seleccionado después de la actualización
            setSelectedMateriaPrima(null);
         
  
        // Actualizar la lista local
      
      });
      
  };
  
  const handleDelete = (id) => {
    // Lógica para actualizar el proveedor
    const apiUrl = `https://localhost:7267/api/MateriaP?Id=${id}`;
    const apiUrlGet = 'https://localhost:7267/api/MateriaP';
  
    axios.delete(apiUrl)
      .then(response => {
        console.log('Proveedor eliminado con éxito:', response.data);
  
        // Actualizar la lista local
        // Recargar la lista de proveedores después de insertar uno nuevo
        axios.get(apiUrlGet)
          .then(response => setMateriaPrima(response.data))
          .catch(error => console.error('Error fetching data:', error));
  
        // Limpiar el proveedor seleccionado después de la actualización
        setSelectedMateriaPrima(null);
      })
      .catch(error => {
        console.error('Error al actualizar proveedor:', error);
      });
  };
  

  const handleRegister = () => {
    // Lógica para registrar un nuevo proveedor
    const apiUrl = 'https://localhost:7267/api/MateriaP';
  
    axios.post(apiUrl, newMateriaPrima)
      .then(response => {
        console.log('Proveedor registrado con éxito:', response.data);
       
      })
      .catch(error => {
        handleCloseModal();

        const apiUrl = 'https://localhost:7267/api/MateriaP';
        axios.get(apiUrl)
        .then(response => setMateriaPrima(response.data))
        .catch(error => console.error('Error fetching data:', error));
            // Limpiar el proveedor seleccionado después de la actualización
            setSelectedMateriaPrima(null);
         
      });
  };


  

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <br />
        <br />
        <br />
        <div className='titleProv'>
          <label className='titleProveedor'>Materia Prima</label>
        </div>

        <input
          type="text"
          className="form-control"
          placeholder="Buscar materia prima"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br />
        <button className="btn btn-primary ml-2" onClick={handleSearch}>
          Buscar
        </button>

        <div className='btnRegistrar'>
          <br />
          <button className="btn btn-success ml-2" onClick={handleShowModal}>
            Registrar Materia Prima
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>CANTIDAD</th>
            <th>UNIDAD</th>
            <th>COSTO</th>
            <th>PROVEEDOR</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {materiaPrima.map((materia) => (
            <tr key={materia.id}>
              <td>{materia.nombre}</td>
              <td>{materia.unidadMedida}</td>
              <td>{materia.costo}</td>
              <td>{materia.Proveedor}</td>
              <td>
                <button onClick={() => handleEdit(materia.id)} className='btn btn-info ml-2'>Editar</button>
              </td>
              <td>
                <button onClick={() => handleDelete(materia.id)} className='btn btn-danger ml-2'>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

<Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>{selectedMateriaPrima ? 'Editar Materia Prima' : 'Registrar Materia Prima'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre de Materia Prima</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre"
          value={selectedMateriaPrima ? selectedMateriaPrima.nombre : newMateriaPrima.nombre}
          onChange={(e) =>
            selectedMateriaPrima
              ? setSelectedMateriaPrima({ ...selectedMateriaPrima, nombre: e.target.value })
              : setNewMateriaPrima({ ...newMateriaPrima, nombre: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formCantidad">
        <Form.Label>Cantidad</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingres la cantidad"
          value={selectedMateriaPrima ? selectedMateriaPrima.cantidad : newMateriaPrima.cantidad}
          onChange={(e) =>
            selectedMateriaPrima
              ? setSelectedMateriaPrima({ ...selectedMateriaPrima, cantidad: e.target.value })
              : setNewMateriaPrima({ ...newMateriaPrima, cantidad: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formUnidad">
        <Form.Label>Unidades</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese la Unidad"
          value={selectedMateriaPrima ? selectedMateriaPrima.unidadMedida : newMateriaPrima.unidadMedida}
          onChange={(e) =>
            selectedMateriaPrima
              ? setSelectedMateriaPrima({ ...selectedMateriaPrima, unidadMedida: e.target.value })
              : setNewMateriaPrima({ ...newMateriaPrima, unidadMedida: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formCosto">
        <Form.Label>Costo</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingrese el costo"
          value={selectedMateriaPrima ? selectedMateriaPrima.costo : newMateriaPrima.costo}
          onChange={(e) =>
            selectedMateriaPrima
              ? setSelectedMateriaPrima({ ...selectedMateriaPrima, costo: e.target.value })
              : setNewMateriaPrima({ ...newMateriaPrima, costo: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formProveedor">
        <Form.Label>Proveedor</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingrese el id del proveedor"
          value={selectedMateriaPrima ? selectedMateriaPrima.idProveedor : newMateriaPrima.idProveedor}
          onChange={(e) =>
            selectedMateriaPrima
              ? setSelectedMateriaPrima({ ...selectedMateriaPrima, idProveedor: e.target.value })
              : setNewMateriaPrima({ ...newMateriaPrima, idProveedor: e.target.value })
          }
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Cerrar
    </Button>
    <Button variant="primary" onClick={selectedMateriaPrima ? handleUpdate : handleRegister}>
      {selectedMateriaPrima ? 'Actualizar' : 'Registrar'}
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default MateriaPrima;
