import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetalleP.css'

const DetalleP = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  const [cantidad, setCantidad] = useState(1);

  const restar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const sumar = () => {
    setCantidad(cantidad + 1);
  };

  const addCarrito = (cantidad) => {
    console.log(`Adding ${cantidad} items to the cart`);
  };

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`https://localhost:7267/api/Productos/${id}`);
        const productoData = response.data;
        if (productoData.foto) {
            productoData.foto = `data:image/png;base64,${productoData.foto}`;
          } else {
            productoData.foto = '../../assets/img/desconocido.png';
          }
        setProducto(productoData);
        
      } catch (error) {
        console.error(error);
      }
    };    

    obtenerProducto();
  }, [id]);

return (
    <div className="container-fluid pb-5">
      {producto && (
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <div id="product-carousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner bg-light">
                <div className="carousel-item active">
                  <img className="img-fixed-size" src={producto.foto} alt={`Foto del producto ${producto.nombre}`} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7 h-auto mb-3">
            <div className="h-100 bg-light p-3">
              <h2>{producto.nombre}</h2>
              <h3 className="font-weight-semi-bold mb-4">${producto.costo}</h3>
              <p className="mb-4">{producto.descripcion}</p>

              <div className="input-group quantity m-3" style={{ width: '130px' }}>
                <div className="input-group-btn">
                  <button className="btn btn-outline-dark btn-minus" onClick={restar}>
                    <i className="bi bi-dash"></i> 
                  </button>
                </div>
                
                <input
                  type="number"
                  className="form-control border-0 text-center"
                  value={cantidad}
                  readOnly
                />
                <div className="input-group-btn">
                  <button className="btn btn-outline-dark btn-plus" onClick={sumar}>
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>

              <button
                className="btn btn-outline-dark px-3"
                onClick={() => addCarrito(cantidad)}
              >
                <i className="fa fa-shopping-cart mr-1"></i>Agregar al carrito
              </button>
            </div>
          </div>
          <div className="col mt-4">
    <div className="bg-light p-30">
      <div className="nav nav-tabs mb-4">
        <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">M&aacute;s Información</a>
        </div>
      <div className="tab-content p-3">
        <div className="tab-pane fade show active" id="tab-pane-1">
          <h4 className="mb-3">Información adicional de {producto.nombre}</h4>
          <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
          <div className="row">            
            <div className="col-md-12">
              <h4 className="mb-4">Leave a review</h4>
              <small>Your email address will not be published. Required fields are marked *</small>
              <div className="d-flex my-3">
                <p className="mb-0 mr-2">Your Rating * :</p>
                <div className="text-dark">
                  <i className="bi bi-star"></i>
                  <i className="bi bi-star"></i>
                  <i className="bi bi-star"></i>
                  <i className="bi bi-star"></i>
                  <i className="bi bi-star"></i>
                </div>
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="message">Your Review *</label>
                  <textarea id="message" cols="30" rows="5" className="form-control"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email *</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group mb-0 mt-2">
                  <input type="submit" value="Leave Your Review" className="btn btn-dark px-3" />
                </div>
              </form>
            </div>
        </div>
        
        
        
      </div>
    </div>
  </div>

</div>
        </div>)}
      


    </div>

  );
};

export default DetalleP;

