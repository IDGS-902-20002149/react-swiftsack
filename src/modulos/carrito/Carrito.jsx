import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Carrito = () => {
  const [dataSource, setDataSource] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );

  const [carrito, setCarrito] = useState([]);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const eliminarItem = async (id) => {
    // Lógica para actualizar el proveedor
    const apiUrl = `https://127.0.0.1:7267/api/Carrito?Id=${id}`;
    const apiUrlGet = `https://127.0.0.1:7267/api/Carrito/obtener-carrito/${user.id}`;

    axios
      .delete(apiUrl)
      .then((response) => {
        console.log("Item eliminado con éxito:", response.data);

        // Actualizar la lista local
        // Recargar la lista de proveedores después de insertar uno nuevo
        axios
          .get(apiUrlGet)
          .then((response) => setCarrito(response.data))
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => {
        console.error("Error al actualizar el carrito:", error);
      });
  };

  // Obtener carrito e items de forma asíncrona
  const fetchData = async () => {
    try {
      const [carritoData, itemsData] = await Promise.all([
        fetch(
          `https://localhost:7267/api/Carrito/obtener-carrito/${user.id}`
        ).then((response) => response.json()),
        fetch(
          `https://localhost:7267/api/Carrito/obtener-items/${user.id}`
        ).then((response) => response.json()),
      ]);

      console.log("Carrito Data:", carritoData);
      console.log("Items Data:", itemsData);

      setCarrito(carritoData);
      setItems(itemsData);
    } catch (error) {
      console.error("Error al obtener el carrito o los items:", error);
    }
  };

  useEffect(() => {
    // Obtener datos solo cuando cambia user.id
    fetchData(); 
  }, [user]);

  useEffect(() => {
    cargarItems();
  }, [carrito]);

  const cargarItems = () => {
    if (!carrito || !items) {
      return;
    }

    let newDataSource = [];
    let newSubtotal = 0;

    for (let i = 0; i < carrito.length; i++) {
      const sub = items[i].costo * carrito[i].cantidad;
      newSubtotal += sub;
      const newRowData = {
        nombre: items[i].nombre,
        cantidad: carrito[i].cantidad,
        precio: items[i].costo,
        subtotal: sub,
        idCarrito: carrito[i].idCarrito,
      };
      newDataSource.push(newRowData);
    }

    setSubtotal(newSubtotal);
    setDataSource(newDataSource);
  };

  return (
    <>
      {carrito ? (
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {dataSource.map((item) => (
                    <tr key={item.idCarrito}>
                      <td className="align-middle">
                        <img
                          src="img/product-1.jpg"
                          alt=""
                          style={{ width: "50px" }}
                        />
                        {item.nombre}
                      </td>
                      <td className="align-middle">${item.precio}</td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: "100px" }}
                        >
                          <input
                            type="text"
                            className="form-control form-control-sm border-0 text-center"
                            value={item.cantidad}
                            readOnly
                          />
                        </div>
                      </td>
                      <td className="align-middle">${item.subtotal}</td>
                      <td className="align-middle">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => eliminarItem(item.idCarrito)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-lg-4">
              <h3 className="section-title position-relative text-uppercase mt-2 text-light">
                <span className="bg-secondary pr-3">Resumen</span>
              </h3>
              <div className="bg-light p-3 mb-5">
                <div className="border-bottom pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>${subtotal.toFixed(2)}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Env&iacute;o</h6>
                    <h6 className="font-weight-medium">$100</h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h3>Total</h3>
                    <h3>${(subtotal + 100).toFixed(2)}</h3>
                  </div>
                  <button
                    className="btn btn-success font-weight-bold"
                    style={{ color: "primary" }}
                    onClick={() => navigate("/GoToPay")}
                  >
                    Proceder al pago
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <img src="" alt="" />
        </div>
      )}
    </>
  );
};

export default Carrito;