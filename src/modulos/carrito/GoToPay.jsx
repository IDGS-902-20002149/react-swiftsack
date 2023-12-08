import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Carrito.css";
import axios from "axios";

const GoToPay = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("userData")));
  const [dataSource, setDataSource] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [direccionSelect, setDireccionSelect] = useState({});

  const [showModalDir, setShowModalDir] = useState(false);
  const [showModalTar, setShowModalTar] = useState(false);

  const [tarjetaSelect, setTarjetaSelect] = useState({});
  const [carrito, setCarrito] = useState([]);
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [idD, setidD] = useState(null);
  const [detallesPedido, setDetallesPedido] = useState([]);

  const [newDireccion, setNewDireccion] = useState({
    idDireccion: 0,
    idUser: user.id,
    nombreCompleto: user.name,
    calleNumero: "",
    codigoPostal: "",
    telefono: "",
  });

  const [newTarjeta, setNewTarjeta] = useState({
    idTarjeta: 0,
    idUser: user.id,
    numeroTarjeta: "",
    numTarEncryp: "",
    nombreTarjeta: "",
    mesVencimiento: "",
    annioVencimiento: "",
    ccv: "",
  });

  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const [pedido, setPedido] = useState({
    id: 0,
    fecha: new Date(),
    iduser: 0,
    idDireccion: 0,
    folio: "",
    estatus: 1,
  });

  const fetchData = async () => {
    try {
      const [carritoData, itemsData, direcciones, tarjetas] = await Promise.all(
        [
          fetch(
            `https://127.0.0.1:7267/api/Carrito/obtener-carrito/${user.id}`
          ).then((response) => response.json()),
          fetch(
            `https://127.0.0.1:7267/api/Carrito/obtener-items/${user.id}`
          ).then((response) => response.json()),
          fetch(
            `https://127.0.0.1:7267/api/Direccion/obtener-direcciones/${user.id}`
          ).then((response) => response.json()),
          fetch(
            `https://127.0.0.1:7267/api/Tarjeta/obtener-tarjetas/${user.id}`
          ).then((response) => response.json()),
        ]
      );

      setCarrito(carritoData);
      setItems(itemsData);
      setDirecciones(direcciones);
      setTarjetas(tarjetas);
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

  const handleDireccionSelect = (direccion) => {
    setDireccionSelect(direccion);
  };

  const handleTarjetaSelect = (tarjeta) => {
    setTarjetaSelect(tarjeta);
  };

  const handleRealizarPedido = async () => {
    // Validar que se haya seleccionado una dirección
    if (!direccionSelect || Object.keys(direccionSelect).length === 0) {
      alert(
        "Por favor, selecciona una dirección de envío antes de realizar el pedido."
      );
      return;
    }

    // Validar que se haya seleccionado una tarjeta
    if (!tarjetaSelect || Object.keys(tarjetaSelect).length === 0) {
      alert(
        "Por favor, selecciona una tarjeta de pago antes de realizar el pedido."
      );
      return;
    }

    try {
      const uniqueFolio = uuidv4();
      const pedido = {
        id: 0,
        fecha: new Date(),
        iduser: user.id,
        idDireccion: idD,
        folio: uniqueFolio,
        estatus: 0,
      };

      console.log("pedidp", pedido);

      const apiUrl = `https://127.0.0.1:7267/api/Pedido`;

      axios
        .post(apiUrl, pedido)
        .then((response) => {
          console.log("Pedido registrado con éxito:", response.data);
          console.log(response.id);
          insertDetallePedido(response.id);
        })
        .catch((error) => {
          console.error("Error al registrar pedido:", error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const insertDetallePedido = async (idPedido) => {
    const apiUrl = `https://127.0.0.1:7267/api/DetallePedido`;

    try {
      dataSource.forEach(async (element) => {
        element.idPedido = idPedido;
        console.log(element);
        axios.post(apiUrl, element).then((response) => {
          console.log(
            "Detalle del pedido registrado con éxito:",
            response.data
          );
          console.log(response.id);
        });
      });

      console.log("Detalles de pedido agregados correctamente");
      limpiarCarrito(user.id);
      navigate("/pedidos");
    } catch (error) {
      console.error(error);
    }
  };

  const limpiarCarrito = async (id) => {
    try {
      axios
        .delete(`https://localhost:7267/api/Carrito/limpiar-carrito/${id}`)
        .then((response) => response.json());
      console.log("Items eliminados correctamente");
    } catch (error) {
      console.error("Error al eliminar items", error);
    }
  };

  const handleShowModalDir = () => setShowModalDir(true);

  const handleCloseModalDir = () => {
    setShowModalDir(false);
  };

  const handleCloseModalTar = () => {
    setShowModalTar(false);
  };

  const handleShowModalTar = () => setShowModalTar(true);

  const handleRegisterDireccion = () => {
    // Lógica para registrar un nuevo proveedor
    const apiUrl = "https://127.0.0.1:7267/api/Direccion";
    const apiUrlGet = `https://127.0.0.1:7267/api/Direccion/obtener-direcciones/${user.id}`;
    alert(JSON.stringify(newDireccion, null, 2));

    axios
      .post(apiUrl, newDireccion)
      .then((response) => {
        console.log("Direccion registrada con éxito:", response.data);
        handleCloseModalDir();

        // Recargar la lista de direcciones después de insertar uno nuevo
        axios
          .get(apiUrlGet)
          .then((response) => setDirecciones(response.data))
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => {
        console.error("Error al registrar direccion:", error);
      });
  };

  const handleDeleteDireccion = (id) => {
    // Lógica para eliminar la direccion
    const apiUrl = `https://127.0.0.1:7267/api/Direccion?Id=${id}`;
    const apiUrlGet = `https://127.0.0.1:7267/api/Direccion/obtener-direcciones/${user.id}`;

    axios
      .delete(apiUrl)
      .then((response) => {
        console.log("Direccion eliminado con éxito:", response.data);

        // Actualizar la lista local
        // Recargar la lista de direcciones después de insertar uno nuevo
        axios
          .get(apiUrlGet)
          .then((response) => setDirecciones(response.data))
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => {
        console.error("Error al actualizar direcciones:", error);
      });
  };

  const handleRegisterTarjeta = () => {
    if (
      newTarjeta.numeroTarjeta.length !== 16 ||
      newTarjeta.mesVencimiento.length !== 2 ||
      newTarjeta.annioVencimiento.length !== 4 ||
      newTarjeta.ccv.length !== 3
    ) {
      setFormError("Verifica la longitud de los campos");
      return;
    }

    // Validar que los campos no estén vacíos
    if (
      !newTarjeta.nombreTarjeta ||
      !newTarjeta.numeroTarjeta ||
      !newTarjeta.mesVencimiento ||
      !newTarjeta.annioVencimiento ||
      !newTarjeta.ccv
    ) {
      setFormError("Todos los campos son obligatorios");
      return;
    }

    // Lógica para registrar una nueva tarjeta
    const apiUrl = "https://127.0.0.1:7267/api/Tarjeta";
    const apiUrlGet = `https://127.0.0.1:7267/api/Tarjeta/obtener-tarjetas/${user.id}`;

    axios
      .post(apiUrl, newTarjeta)
      .then((response) => {
        console.log("Tarjeta registrada con éxito:", response.data);
        handleCloseModalTar();

        // Recargar la lista de tarjetas después de insertar una nueva
        axios
          .get(apiUrlGet)
          .then((response) => setTarjetas(response.data))
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => {
        console.error("Error al registrar tarjeta:", error);
      });
  };

  const handleDeleteTarjeta = (id) => {
    // Lógica para eliminar la direccion
    const apiUrl = `https://127.0.0.1:7267/api/Tarjeta?Id=${id}`;
    const apiUrlGet = `https://127.0.0.1:7267/api/Tarjeta/obtener-tarjetas/${user.id}`;

    axios
      .delete(apiUrl)
      .then((response) => {
        console.log("Tarjeta eliminado con éxito:", response.data);

        // Actualizar la lista local
        // Recargar la lista de tarjetas después de eliminar una
        axios
          .get(apiUrlGet)
          .then((response) => setTarjetas(response.data))
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => {
        console.error("Error al actualizar tarjetas:", error);
      });
  };

  const handleInputChange = (fieldName, value) => {
    // Expresión regular para permitir solo números
    const regex = /^[0-9]*$/;

    // Verificar si el valor cumple con la expresión regular
    if (regex.test(value) || value === "") {
      setNewTarjeta({
        ...newTarjeta,
        [fieldName]: value,
      });
    }
  };

  const maxLengthForField = (fieldName) => {
    switch (fieldName) {
      case "numeroTarjeta":
        return 16;
      case "mesVencimiento":
        return 2;
      case "annioVencimiento":
        return 4;
      case "ccv":
        return 3;
      default:
        return 255; // Valor predeterminado
    }
  };

  return (
    <div className="mt-5 pt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-8 d-flex">
          <div className="col-9">
            <h3>{user.name}</h3>
            <div className="card mt-4">
              <div className="card-header">
                <a
                  className="link-underline-opacity-0"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <h3>Dirección de envío</h3>
                </a>
              </div>
              <div className="collapse" id="collapseExample">
                <div className="card-body">
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-outline-success"
                      onClick={handleShowModalDir}
                    >
                      Agregar dirección <i className="bi bi-patch-plus"></i>
                    </button>
                  </div>
                  {direcciones.map((direccion) => (
  <div key={direccion.idDireccion}>
    <div className="card mt-3">
    <div className="card-body">
      <div className="row">
        <div className="col-1 form-check d-flex align-items-center">
          <input
            type="radio"
            name="rgroupDirecciones"
            onChange={() => {
              handleDireccionSelect(direccion);
              setidD(direccion.idDireccion);
            }}
            checked={idD === direccion.idDireccion}
          />
        </div>
        <div className="col-11">
          <p className="mb-0">
            Nombre quien recibe: {direccion.nombreCompleto}
          </p>
          <p className="mb-0">Dirección: {direccion.calleNumero}</p>
          <p className="mb-0">C.P.: {direccion.codigoPostal}</p>
          <p className="mb-0">Teléfono: +52 {direccion.telefono}</p>
          <div>
            <button
              className="btn btn-danger float-end"
              onClick={() => handleDeleteDireccion(direccion.idDireccion)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
))}
                </div>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-header">
                <a
                  className="link-underline-opacity-0"
                  data-bs-toggle="collapse"
                  href="#cmbTarjetas"
                  role="button"
                  aria-expanded="false"
                  aria-controls="cmbTarjetas"
                >
                  <h3>Método de pago</h3>
                </a>
              </div>
              <div className="collapse" id="cmbTarjetas">
                <div className="card-body">
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-outline-success"
                      onClick={handleShowModalTar}
                    >
                      Agregar tarjeta <i className="bi bi-patch-plus"></i>
                    </button>
                  </div>
                  {tarjetas.map((tarjeta) => (
                    <div className="card mt-3" key={tarjeta.id}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-2 form-check d-flex align-items-center">
                            <input
                              type="radio"
                              name="rgroupTarjetas"
                              onChange={() => handleTarjetaSelect(tarjeta)}
                            />
                          </div>
                          <div className="col-10">
                            <p className="mb-0">
                              **** **** **** {tarjeta.numTarEncryp}
                            </p>
                            <p className="mb-0">
                              Nombre: {tarjeta.nombreTarjeta}
                            </p>
                            <p className="mb-0">
                              Fecha de vencimiento: {tarjeta.mesVencimiento} /{" "}
                              {tarjeta.annioVencimiento}
                            </p>
                            <div className="float-end">
                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  handleDeleteTarjeta(tarjeta.idTarjeta)
                                }
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="col-lg-4">
              <h3 className="section-title position-relative text-uppercase mt-2 text-light">
                <span className="pr-3">Resumen</span>
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
                    id="liveToastBtn"
                    className="btn btn-success font-weight-bold mt-4"
                    style={{ color: "primary" }}
                    onClick={() => handleRealizarPedido()}
                  >
                    Realizar pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..." />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>

      {/* Modal para direcciones */}
      <Modal show={showModalDir} onHide={handleCloseModalDir}>
        <Modal.Header closeButton>
          <Modal.Title>{"Nueva dirección"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la dirección completa"
                value={newDireccion.calleNumero}
                onChange={(e) =>
                  setNewDireccion({
                    ...newDireccion,
                    calleNumero: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCP">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código Postal"
                value={newDireccion.codigoPostal}
                onChange={(e) =>
                  setNewDireccion({
                    ...newDireccion,
                    codigoPostal: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el número de teléfono"
                value={newDireccion.telefono}
                onChange={(e) =>
                  setNewDireccion({
                    ...newDireccion,
                    telefono: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalDir}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleRegisterDireccion}>
            {"Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para tarjetas */}
      <Modal show={showModalTar} onHide={handleCloseModalTar}>
        <Modal.Header closeButton>
          <Modal.Title>{"Nueva tarjeta"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombreTarjeta">
              <Form.Label>Nombre en la tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre completo"
                value={newTarjeta.nombreTarjeta}
                onChange={(e) =>
                  setNewTarjeta({
                    ...newTarjeta,
                    nombreTarjeta: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formNumTar">
              <Form.Label>Números de la tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="0000 0000 0000 0000"
                value={newTarjeta.numeroTarjeta}
                onChange={(e) =>
                  handleInputChange("numeroTarjeta", e.target.value)
                }
                maxLength={maxLengthForField("numeroTarjeta")}
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              <div className="col-2">
                <Form.Group controlId="formMes">
                  <Form.Label>Mes</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="00"
                    value={newTarjeta.mesVencimiento}
                    onChange={(e) =>
                      handleInputChange("mesVencimiento", e.target.value)
                    }
                    maxLength={maxLengthForField("mesVencimiento")}
                  />
                </Form.Group>
              </div>
              <div className="pt-2 mt-4"> / </div>
              <div className="col-3">
                <Form.Group controlId="formAnio">
                  <Form.Label>Año</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0000"
                    value={newTarjeta.annioVencimiento}
                    onChange={(e) =>
                      handleInputChange("annioVencimiento", e.target.value)
                    }
                    maxLength={maxLengthForField("annioVencimiento")}
                  />
                </Form.Group>
              </div>
              <div className="col-3">
                <Form.Group controlId="formCCV">
                  <Form.Label>CCV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="123"
                    value={newTarjeta.ccv}
                    onChange={(e) => handleInputChange("ccv", e.target.value)}
                    maxLength={maxLengthForField("ccv")}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalTar}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleRegisterTarjeta}>
            {"Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GoToPay;
