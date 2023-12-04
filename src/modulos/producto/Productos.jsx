import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);


  const cargarProductos = async () => {
    try {
      const response = await axios.get('https://localhost:7267/api/Productos');
      const productosData = response.data.map((producto) => {
        if (producto.foto) {
          producto.foto = `data:image/png;base64,${producto.foto}`;
        } else {
          producto.foto = '../../../public/desconocido.png';
        }
        return producto;
      });
      setProductos(productosData);
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    cargarProductos();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <div className="row pb-3">
            {currentItems.map((producto) => (
              <div key={producto.id} className="col-lg-4 col-md-6 col-sm-6 pb-1">
                <div className="product-item mb-4">
                  <div className="product-img position-relative overflow-hidden">
                    <img
                      className="img-fixed-size"
                      src={producto.foto}
                      alt={`Foto del producto ${producto.nombre}`}
                    />
                    <div className="product-action">
                      {/* <a className="btn btn-outline-dark btn-square"><i className="bi bi-cart-fill"></i></a> */}
                      <Link to={`/detalleProducto/${producto.id}`} className="btn btn-outline-dark btn-square">
                      Ver m&aacute;s <i className="bi bi-search"></i>
                      </Link>

                    </div>
                  </div>
                  <div className="text-center py-4">
                    <a className="h6 text-decoration-none text-truncate" href="#"
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '50%' }}>
                      {producto.nombre}
                    </a>
                    <div className="d-flex align-items-center justify-content-center mt-2">
                      <h5>${producto.costo}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {[...Array(Math.ceil(productos.length / itemsPerPage))].map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className="btn btn-outline-dark" 
              style={{ fontSize: '20px', padding: '10px 20px', marginRight: '10px'}}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
