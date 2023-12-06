import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import './Home.css'
import "animate.css/animate.min.css";


const Home = () => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const response = await axios.get("https://localhost:7267/api/Productos");
      const productosData = response.data.map((producto) => {
        if (producto.foto) {
          producto.foto = `data:image/png;base64,${producto.foto}`;
        } else {
          producto.foto = "../../../public/desconocido.png";
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

  return (
  <div>
    <div className="container-fluid mb-3">
  
  <div className="row px-xl-5">
  <div className="col-lg-8">
       <div   id="header-carousel"
         className="carousel slide carousel-fade mb-30 mb-lg-0"
         data-ride="carousel"
       >
         <ol className="carousel-indicators">
           <li
             data-target="#header-carousel"
             data-slide-to="0"
             className="active"
           ></li>
           <li data-target="#header-carousel" data-slide-to="1"></li>
           <li data-target="#header-carousel" data-slide-to="2"></li>
         </ol>
         <div className="carousel-inner">
           <div
             className="carousel-item position-relative active"
             style={{height: '430px'}}
           >
             <img
               className="position-absolute w-100 h-100"
               src="../../../public/img-carousel-1.jpg"
               style={{ objectFit: 'cover' }}

             />
             <div
               className="carousel-caption d-flex flex-column align-items-center justify-content-center"
             >
             <div className="p-3" style={{ maxWidth: '700px' }}>
               <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                 Men Fashion
               </h1>
               <p className="mx-md-5 text-white px-5 animate__animated animate__bounceIn">
                 Explora nuestras mochilas de moda para hombres.
                 Desde diseños elegantes hasta estilos urbanos y funcionales, nuestras mochilas están diseñadas para elevar tu estilo y satisfacer tus necesidades.
               </p>
               <a
                 className="btn btn-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                 href="/productos"
                 >Conoce nuestros productos</a
               >
             </div>
             </div>
           </div>
           <div className="carousel-item position-relative" style={{ height: '430px' }}>
             <img
               className="position-absolute w-100 h-100"
               src="../../../public/img-carousel-2.jpg"
               style={{ objectFit: 'cover' }}

             />
             <div
               className="carousel-caption d-flex flex-column align-items-center justify-content-center"
             >
               <div className="p-3" style= {{ maxWidth: '700px' }}>
                 <h1
                   className="display-4 text-white mb-3 animate__animated animate__fadeInDown"
                 >
                   Women Fashion
                 </h1>
                 <p className="mx-md-5 px-5 text-white animate__animated animate__bounceIn">
                   Descubre nuestra selección de mochilas de moda para mujeres. Encuentra la mochila que exprese tu estilo único y te permita llevar todo lo que necesitas con estilo y comodidad.
                 </p>
                 <a
                   className="btn btn-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                   href="/productos"
                   >Conoce nuestros productos</a
                 >
               </div>
             </div>
           </div>
           <div className="carousel-item position-relative" style={{height: '430px'}}>
             <img
               className="position-absolute w-100 h-100"
               src="../../../public/img-carousel-3.jpg"
               style={{ objectFit: 'cover' }}

             />
             <div
               className="carousel-caption d-flex flex-column align-items-center justify-content-center"
             >
               <div className="p-3" style= {{maxWidth: '700px'}}>
                 <h1
                   className="display-4 text-white mb-3 animate__animated animate__fadeInDown"
                 >
                   Kids Fashion
                 </h1>
                 <p className="mx-md-5 px-5 text-white animate__animated animate__bounceIn">
                   Descubre nuestras adorables y funcionales mochilas de moda para niños.
                   Diseñadas pensando en la comodidad y el estilo de los más pequeños.
                 </p>
                 <a
                   className="btn btn-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                   href="/productos"
                   >Conoce nuestros producto</a
                 >
               </div>
             </div>
           </div>
         </div>
       </div>
  </div>
  <div className="col-lg-4">
    <div className="product-offer mb-30" style={{height: '200px'}}>
      <img className="img-fluid" src="../../../public/offer-1.jpg" alt="" />
      <div className="offer-text">
          <h3 className="text-white mb-3">Descubre nuestros productos</h3>
          <a href="/productos" className="btn btn-dark">Ver m&aacute;s</a>
      </div>
    </div>
    <div className="product-offer mb-30 mt-4" style={{height: '200px'}}>
      <img className="img-fluid" src="../../../public/offer-2.jpg" alt="" />
      <div className="offer-text">
          <h3 className="text-white mb-3">Descubre nuestros productos</h3>
          <a href="/productos" className="btn btn-dark">Ver m&aacute;s</a>
      </div>
    </div>
  </div>
    </div> 
    

    </div>
    <div className="container-fluid pt-5 ">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-white pr-3">¿Quiénes somos?</span>
      </h2>
      <div className="row px-xl-5">

        <div className="col-lg-6 col-md-5  d-flex align-items-center justify-content-center">
          <div className="overflow-hidden" style={{ maxWidth: '80%', height: 'auto' }}>
            <img className="img-fluid-home" src="../../../public/mochilas.png" alt="Mochilas SwiftSack" />
          </div>
        </div>

        <div className="col-lg-6 col-md-12  d-flex align-items-center">
          <h4 className="text-center">
            <br/>
            En SwiftSack, somos apasionados creadores de mochilas que fusionan magistralmente funcionalidad y estilo. Desde mochilas escolares hasta elegante equipaje de viaje, cada producto es una manifestación de nuestra incansable dedicación a la innovación y la excelencia. Nos esforzamos por trascender los límites, valorando la calidad, la sostenibilidad y la satisfacción del cliente en cada minucioso detalle. La autenticidad fluye en nuestras venas y se plasma en cada diseño único, una poderosa expresión de nuestra conexión humana con la esencia de quienes las llevan.
          </h4>
        </div>
      </div>
    </div>
    <div className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-white pr-3">Filosofia</span>
      </h2>
      <div className="row px-xl-5 pb-3 mt-5">
        <div className="col-lg-4 col-md-12 pb-4">
          <div className="mission-box">
            <h2>Misión</h2>
            <p>
              Nuestra misión es diseñar y fabricar mochilas funcionales y duraderas que se adapten a las necesidades únicas de nuestros clientes. Buscamos superar las expectativas al brindar soluciones de almacenamiento versátiles y cómodas para estudiantes, viajeros, deportistas, profesionales y todos aquellos que buscan un compañero confiable en sus jornadas diarias y emocionantes.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 pb-4">
          <div className="vision-box">
            <h2>Visión</h2>
            <p>
              Ser reconocidos como líderes en la industria de las mochilas, ofreciendo una amplia gama de productos diseñados para acompañar y enriquecer la vida de nuestros clientes en cada una de sus aventuras y actividades. Nos esforzamos por ser una marca de referencia que refleje innovación, calidad y estilo en cada uno de nuestros productos.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 pb-4">
          <div className="values-box">
            <h2>Valores</h2>
            <ul>
              <li>Excelencia: Perseguimos la perfección y ofrecemos calidad insuperable.</li>
              <li>Innovación: Buscamos constantemente nuevas ideas y soluciones originales.</li>
              <li>Sostenibilidad: Adoptamos prácticas amigables con el medio ambiente.</li>
              <li>Autenticidad: Mantenemos la integridad en todo lo que hacemos.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-white pr-3">Productos Destacados</span>
      </h2>
      <div className="row px-xl-5">
      {productos.slice(0, 8)
                
                .map((producto) => (
                  <div key={producto.id} className="col-lg-3 col-md-6 col-sm-6 pb-1">
                    <div className="product-item mb-4">
                      <div className="product-img position-relative overflow-hidden">
                        <img
                          className="img-fixed-size"
                          src={producto.foto}
                          alt={`Foto del producto ${producto.nombre}`}
                        />
                        <div className="product-action">
                      
                          <a href="/productos" className="btn btn-outline-dark btn-square">Conoce mas<i className="bi bi-search"></i></a>
                        </div>
                      </div>
                      <div className="text-center py-4">
                        <a className="h6 text-decoration-none text-truncate" href="/productos">
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
    </div>
    <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
          <p className="mb-4">
            No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et
            dolor sed dolor. Rebum tempor no vero est magna amet no
          </p>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New
            York, USA
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-primary mr-3"></i>info@example.com
          </p>
          <p className="mb-0">
            <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
          </p>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">Quick Shop</h5>
              <div className="d-flex flex-column justify-content-start">
                <a className="text-secondary mb-2" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Home
                </a>
                <a className="text-secondary mb-2" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Our Shop
                </a>
                <a className="text-secondary mb-2" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Shop Detail
                </a>
                <a className="text-secondary mb-2" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Shopping Cart
                </a>
                <a className="text-secondary mb-2" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Checkout
                </a>
                <a className="text-secondary" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Contact Us
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">My Account</h5>
              <div className="d-flex flex-column justify-content-start">
              <a className="text-secondary mb-2" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Home
                </a>
                <a className="text-secondary mb-2" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Our Shop
                </a>
                <a className="text-secondary mb-2" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Shop Detail
                </a>
                <a className="text-secondary mb-2" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Shopping Cart
                </a>
                <a className="text-secondary mb-2" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Checkout
                </a>
                <a className="text-secondary" href="/productos">
                  <i className="fa fa-angle-right mr-2"></i>Contact Us
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
              <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
              <form action="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Email Address"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">Sign Up</button>
                  </div>
                </div>
              </form>
              <h6 className="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
              <div className="d-flex">
              <a className="btn btn-primary btn-square m-1" href="/productos">
                <i className="bi bi-twitter"></i>
              </a>
              <a className="btn btn-primary btn-square m-1" href="/productos">
                <i className="bi bi-facebook"></i>
              </a>
              <a className="btn btn-primary btn-square m-1" href="/productos">
                <i className="bi bi-linkedin"></i>
              </a>
              <a className="btn btn-primary btn-square m-1" href="/productos">
                <i className="bi bi-instagram"></i>
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
      className="row border-top mx-xl-5 py-4"
      style={{ borderColor: 'rgba(256, 256, 256, 0.1)', important: true }}
      >
        <div className="col-md-6 px-xl-0">
          <p className="mb-md-0 text-center text-md-left text-secondary">
            &copy; 
            <a className="text-primary" href="/productos">Domain</a>. All Rights Reserved.
            Designed by
            <a className="text-primary" href="https://htmlcodex.com">HTML Codex</a>
          </p>
        </div>
        <div className="col-md-6 px-xl-0 text-center text-md-right">
          <img className="img-fluid" src="img/payments.png" alt="" />
        </div>
      </div>
    </div>
</div>
  );
};

export default Home;
