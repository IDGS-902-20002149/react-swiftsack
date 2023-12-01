/* eslint-disable no-undef */
import { useEffect, useState } from 'react';

const Compra = () => {
  const [proveedores, setProveedores] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [regMateriaPss, setRegMateriaPss] = useState({
    idProveedor: 0,
    id: 0,
    unidadMedida: '',
    nombreProveedor: '',
  });
  const [setMateria, setSetMateria] = useState({
    cantidad: 0,
    precio: 0,
  });
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [materiasPrimaCompleta, setMateriasPrimaCompleta] = useState([]);
  const [nuevaCompra, setNuevaCompra] = useState({
    
    fecha: new Date(),
    iduser: 0,
    idProveedor: 0,
    folio: '',
    estatus: true,
  });

  const API_URL = 'https://127.0.0.1:7267/api';

  useEffect(() => {
    // Cargar todas las materias primas disponibles y almacenarlas en el estado
    fetch(`${API_URL}/MateriaP`)
      .then((response) => response.json())
      .then((data) => {
        setMateriasPrimaCompleta(data);
      })
      .catch((error) => console.error(error));

    // Cargar la lista de proveedores
    fetch(`${API_URL}/ProveMater`)
      .then((response) => response.json())
      .then((data) => {
        setProveedores(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const setMateriaCompra = () => {
    const newRowData = {
      nombre: regMateriaPss.nombre,
      cantidad: setMateria.cantidad,
      precio: setMateria.precio,
      subtotal: setMateria.cantidad * setMateria.precio,
      id: regMateriaPss.id,  
    };
  
    const updatedDataSource = [...dataSource, newRowData];
    setDataSource(updatedDataSource);
  
    calcularTotal(updatedDataSource);
  };
  

  const calcularTotal = (data) => {
    const newTotal = data.reduce((acc, row) => acc + row.subtotal, 0);
    setTotal(newTotal);
  };

  const obtenerInfoProveedor = async (idProveedor) => {
    try {
      const response = await fetch(`${API_URL}/ProveMater/${idProveedor}`);
      if (!response.ok) {
        throw new Error(`Error al obtener información del proveedor: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al obtener información del proveedor: ${error.message}`);
      throw error;
    }
  };

  const handleProveedorChange = async (e) => {
    const idProveedor = parseInt(e.target.value, 10);

    setRegMateriaPss({
      ...regMateriaPss,
      idProveedor,
    });

    const materiasProveedor = materiasPrimaCompleta.filter((materia) => materia.idProveedor === idProveedor);
    setMaterias(materiasProveedor);
  };

  const handleMateriaChange = async (e) => {
    const materiaId = parseInt(e.target.value, 10);
    const materiaSeleccionada = materiasPrimaCompleta.find((materia) => materia.id === materiaId);

    try {
      const proveedorInfo = await obtenerInfoProveedor(materiaSeleccionada.idProveedor);

      setRegMateriaPss({
        id: materiaSeleccionada.id,
        nombre: materiaSeleccionada.nombre,
        unidadMedida: materiaSeleccionada.unidadMedida,
        idProveedor: materiaSeleccionada.idProveedor,
        nombreProveedor: proveedorInfo.nombre,
      });

      console.log(`ID del Proveedor: ${materiaSeleccionada.idProveedor}`);
      console.log(`Nombre del Proveedor: ${proveedorInfo.nombre}`);
    } catch (error) {
      console.error(`Error al obtener información del proveedor: ${error.message}`);
    }
  };

  const insertarCompra = async () => {
    try {
      const uniqueFolio = "uuidv4";
      const compraData = {
        ...nuevaCompra,
        iduser: 20, 
        idProveedor: regMateriaPss.idProveedor,
        folio: uniqueFolio,
      };
  
      const responseCompra = await fetch(`${API_URL}/Compra`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compraData),
      });
  
      if (!responseCompra.ok) {
        throw new Error(`Error al registrar la compra: ${responseCompra.statusText}`);
      }
  
      console.log(compraData);
  
      const compra = await responseCompra.json();
  
      for (const detalle of dataSource) {
        const detalleCompraData = {
          idCompra: compra.idCompra,
          idProducto: detalle.id,  // Utilizar el id de newRowData
          cantidad: detalle.cantidad,
          precio: detalle.precio,
        };
  
        console.log(detalleCompraData);
  
        const responseDetalleCompra = await fetch(`${API_URL}/DetalleCompra`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(detalleCompraData),
        });
  
        if (!responseDetalleCompra.ok) {
          throw new Error(`Error al registrar el detalle de la compra: ${responseDetalleCompra.statusText}`);
        }
      }
  
      setNuevaCompra({
        fecha: new Date(),
        iduser: 0,
        idProveedor: 0,
        folio: '',
        estatus: true,
      });
  
      setDataSource([]);
  
      console.log("Compra agregada");
    } catch (error) {
      console.error(`Error al realizar la compra: ${error.message}`);
    }
  };
  

  return (
    <div className="row d-flex justify-content-center">
      <div className="card formulario col-12 text-center">
        <h1>Compra de Productos a Proveedores</h1>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
            <br /><br /><br />
              <form>
                <label>Seleccionar proveedor</label>
                <select
                  name="idProveedor"
                  onChange={handleProveedorChange}
                  value={regMateriaPss.idProveedor}
                  required
                >
                  {proveedores.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.id}>
                      {proveedor.nombre}
                    </option>
                  ))}
                </select>

                <br />
                <label>Seleccionar materia prima</label>
                <select
                  name="id"
                  onChange={handleMateriaChange}
                  value={regMateriaPss.id}
                  required
                >
                  {materias.map((materia) => (
                    <option key={materia.id} value={materia.id}>
                      {materia.nombre}
                    </option>
                  ))}
                </select>

                <br />
                <label>Unidad de medida</label>
                <input
                  name="unidadMedida"
                  id="unidadMedida"
                  type="text"
                  value={regMateriaPss.unidadMedida}
                  readOnly
                />
                <br />
                <label>Cantidad comprada</label>
                <input
                  name="cantidad"
                  id="cantidad"
                  onChange={(e) =>
                    setSetMateria({
                      ...setMateria,
                      cantidad: parseInt(e.target.value, 10),
                    })
                  }
                  type="number"
                  placeholder="20"
                  value={setMateria.cantidad}
                />
                <br />
                <label>Precio pagado por unidad</label>
                <input
                  name="precio"
                  id="precio"
                  onChange={(e) =>
                    setSetMateria({
                      ...setMateria,
                      precio: parseInt(e.target.value, 10),
                    })
                  }
                  type="number"
                  placeholder="20"
                  value={setMateria.precio}
                />
                <div className="d-flex justify-content-center">
                  <button type="button" onClick={() => setMateriaCompra()}>
                    Agregar a la orden
                  </button>
                </div>
              </form>
            </div>
            <div className="col-6">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSource.map((row, index) => (
                    <tr key={index}>
                      <td>{row.nombre}</td>
                      <td>{row.cantidad}</td>
                      <td>{row.precio}</td>
                      <td>{row.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <h2>Total: ${total}</h2>
              </div>
              <div className="d-flex justify-content-center">
                <button type="button" onClick={() => insertarCompra()}>
                  Finalizar orden
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compra;