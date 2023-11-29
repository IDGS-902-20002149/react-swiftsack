/* eslint-disable no-unused-vars */
import './Proveedores.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const Proveedores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [newProveedor, setNewProveedor] = useState({
    id: 0,
    nombre: '',
    empresa: '',
    rfc: '',
    telefono: '',
    email: '',
    estatus: true,
  });

  useEffect(() => {
    const apiUrl = 'https://localhost:7267/api/ProveMater';
    axios.get(apiUrl)
      .then(response => setProveedores(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = () => {
    const apiUrl = `https://localhost:7267/api/ProveMater/${searchTerm}`;

    axios.get(apiUrl)
      .then(response => setProveedores(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewProveedor({
      id: 0,
      nombre: '',
      empresa: '',
      rfc: '',
      telefono: '',
      email: '',
      estatus: true,
    });
  };


  const handleEdit = (id) => {
    // Buscar el proveedor correspondiente en la lista
    const selected = proveedores.find((proveedor) => proveedor.id === id);
  
    // Establecer el proveedor seleccionado en el estado
    setSelectedProveedor(selected);
  
    // Mostrar el modal de edición
    setShowModal(true);
  };

  const handleUpdate = () => {
    // Lógica para actualizar el proveedor
    const apiUrl = `https://localhost:7267/api/ProveMater/${selectedProveedor.id}`;
  
    axios.put(apiUrl, selectedProveedor)
      .then(response => {
        console.log('Proveedor actualizado con éxito:', response.data);
        handleCloseModal();
  
        // Actualizar la lista local
        setProveedores(prevProveedores =>
          prevProveedores.map(prov =>
            prov.id === selectedProveedor.id ? response.data : prov
          )
        );
  
        // Limpiar el proveedor seleccionado después de la actualización
        setSelectedProveedor(null);
      })
      .catch(error => {
        console.error('Error al actualizar proveedor:', error);
      });
  };
  
  const handleDelete = (id) => {
    // Lógica para actualizar el proveedor
    const apiUrl = `https://localhost:7267/api/ProveMater?Id=${id}`;
    const apiUrlGet = 'https://localhost:7267/api/ProveMater';
  
    axios.delete(apiUrl)
      .then(response => {
        console.log('Proveedor eliminado con éxito:', response.data);
  
        // Actualizar la lista local
        // Recargar la lista de proveedores después de insertar uno nuevo
        axios.get(apiUrlGet)
          .then(response => setProveedores(response.data))
          .catch(error => console.error('Error fetching data:', error));
  
        // Limpiar el proveedor seleccionado después de la actualización
        setSelectedProveedor(null);
      })
      .catch(error => {
        console.error('Error al actualizar proveedor:', error);
      });
  };
  

  const handleRegister = () => {
    // Lógica para registrar un nuevo proveedor
    const apiUrl = 'https://localhost:7267/api/ProveMater';
  
    axios.post(apiUrl, newProveedor)
      .then(response => {
        console.log('Proveedor registrado con éxito:', response.data);
        handleCloseModal();
  
        // Recargar la lista de proveedores después de insertar uno nuevo
        axios.get(apiUrl)
          .then(response => setProveedores(response.data))
          .catch(error => console.error('Error fetching data:', error));
      })
      .catch(error => {
        console.error('Error al registrar proveedor:', error);
      });
  };


  

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <br />
        <br />
        <br />
        <div className='titleProv'>
          <label className='titleProveedor'>Proveedores</label>
        </div>

        <input
          type="text"
          className="form-control"
          placeholder="Buscar proveedores"
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
            Registrar Proveedor
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>EMPRESA</th>
            <th>TELEFONO</th>
            <th>E-MAIL</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.empresa}</td>
              <td>{proveedor.telefono}</td>
              <td>{proveedor.email}</td>
              <td>
                <button onClick={() => handleEdit(proveedor.id)} className='btn btn-info ml-2'>Editar</button>
              </td>
              <td>
                <button onClick={() => handleDelete(proveedor.id)} className='btn btn-danger ml-2'>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para registrar o editar un proveedor */}
<Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>{selectedProveedor ? 'Editar Proveedor' : 'Registrar Proveedor'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre del Proveedor</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre"
          value={selectedProveedor ? selectedProveedor.nombre : newProveedor.nombre}
          onChange={(e) =>
            selectedProveedor
              ? setSelectedProveedor({ ...selectedProveedor, nombre: e.target.value })
              : setNewProveedor({ ...newProveedor, nombre: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formEmpresa">
        <Form.Label>Empresa</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre de la empresa"
          value={selectedProveedor ? selectedProveedor.empresa : newProveedor.empresa}
          onChange={(e) =>
            selectedProveedor
              ? setSelectedProveedor({ ...selectedProveedor, empresa: e.target.value })
              : setNewProveedor({ ...newProveedor, empresa: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formRfc">
        <Form.Label>RFC</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el RFC"
          value={selectedProveedor ? selectedProveedor.rfc : newProveedor.rfc}
          onChange={(e) =>
            selectedProveedor
              ? setSelectedProveedor({ ...selectedProveedor, rfc: e.target.value })
              : setNewProveedor({ ...newProveedor, rfc: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formTelefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el número de teléfono"
          value={selectedProveedor ? selectedProveedor.telefono : newProveedor.telefono}
          onChange={(e) =>
            selectedProveedor
              ? setSelectedProveedor({ ...selectedProveedor, telefono: e.target.value })
              : setNewProveedor({ ...newProveedor, telefono: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese la dirección de correo electrónico"
          value={selectedProveedor ? selectedProveedor.email : newProveedor.email}
          onChange={(e) =>
            selectedProveedor
              ? setSelectedProveedor({ ...selectedProveedor, email: e.target.value })
              : setNewProveedor({ ...newProveedor, email: e.target.value })
          }
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Cerrar
    </Button>
    <Button variant="primary" onClick={selectedProveedor ? handleUpdate : handleRegister}>
      {selectedProveedor ? 'Actualizar' : 'Registrar'}
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default Proveedores;
