import imgCarousel1 from "../../assets/img/img-carousel-1.jpg";
import imgCarousel2 from "../../assets/img/img-carousel-2.jpg";
import imgCarousel3 from "../../assets/img/img-carousel-3.jpg";
import offer1 from "../../assets/img/offer-1.jpg";
import offer2 from "../../assets/img/offer-2.jpg";
import mochilas from "../../assets/img/mochilas.png";
import mochila1 from "../../assets/img/mochila-1.png";
import mochila2 from "../../assets/img/mochila-2.png";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container-fluid mb-3 mt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div
              id="header-carousel"
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
                  style={{ height: "430px" }}
                >
                  <img
                    className="position-absolute w-100 h-100"
                    src={imgCarousel1}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: "700px" }}>
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                        Men Fashion
                      </h1>
                      <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                        Explora nuestras mochilas de moda para hombres. Desde
                        diseños elegantes hasta estilos urbanos y funcionales,
                        nuestras mochilas están diseñadas para elevar tu estilo
                        y satisfacer tus necesidades.
                      </p>
                      <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp">
                        Conoce nuestros productos
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="carousel-item position-relative"
                  style={{ height: "430px" }}
                >
                  <img
                    className="position-absolute w-100 h-100"
                    src={imgCarousel2}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: "700px" }}>
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                        Women Fashion
                      </h1>
                      <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                        Descubre nuestra selección de mochilas de moda para
                        mujeres. Encuentra la mochila que exprese tu estilo
                        único y te permita llevar todo lo que necesitas con
                        estilo y comodidad.
                      </p>
                      <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp">
                        Conoce nuestros productos
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="carousel-item position-relative"
                  style={{ height: "430px" }}
                >
                  <img
                    className="position-absolute w-100 h-100"
                    src={imgCarousel3}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: "700px" }}>
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                        Kids Fashion
                      </h1>
                      <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                        Descubre nuestras adorables y funcionales mochilas de
                        moda para niños. Diseñadas pensando en la comodidad y el
                        estilo de los más pequeños.
                      </p>
                      <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp">
                        Conoce nuestros producto
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="product-offer mb-30" style={{ height: "200px" }}>
              <img className="img-fluid" src={offer1} alt="" />
              <div className="offer-text p-2">
                <h5 className="text-white mb-3 text-center">
                  Descubre nuestros increibles productos
                </h5>
                <a className="btn btn-primary">Ver m&aacute;s</a>
              </div>
            </div>
            <div
              className="product-offer mb-30 mt-4"
              style={{ height: "200px" }}
            >
              <img className="img-fluid" src={offer2} alt="" />
              <div className="offer-text p-2">
                <h5 className="text-white mb-3 text-center">
                  Descubre nuestros increibles productos
                </h5>
                <a className="btn btn-primary">Ver m&aacute;s</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">¿Quiénes somos?</span>
        </h2>
        <div className="row px-xl-3">
          <div className="col-lg-auto col-md-6 pb-4 d-flex align-items-center justify-content-center">
            <div
              className="overflow-hidden"
              style={{ maxWidth: "100%", height: "auto" }}
            >
              <img
                className="img-fluid"
                src={mochilas}
                alt="Mochilas SwiftSack"
                style={{ width: "590px" }}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-12 d-flex align-items-center">
            <h2>
              En SwiftSack, somos apasionados creadores de mochilas que fusionan
              magistralmente funcionalidad y estilo. Desde mochilas escolares
              hasta elegante equipaje de viaje, cada producto es una
              manifestación de nuestra incansable dedicación a la innovación y
              la excelencia. Nos esforzamos por trascender los límites,
              valorando la calidad, la sostenibilidad y la satisfacción del
              cliente en cada minucioso detalle. La autenticidad fluye en
              nuestras venas y se plasma en cada diseño único, una poderosa
              expresión de nuestra conexión humana con la esencia de quienes las
              llevan.
            </h2>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Filosofia</span>
        </h2>
        <div className="row px-xl-5 pb-3 mt-5">
          <div className="col-lg-4 col-md-12 pb-4">
            <div className="mission-box">
              <h2>Misión</h2>
              <p>
                Nuestra misión es diseñar y fabricar mochilas funcionales y
                duraderas que se adapten a las necesidades únicas de nuestros
                clientes. Buscamos superar las expectativas al brindar
                soluciones de almacenamiento versátiles y cómodas para
                estudiantes, viajeros, deportistas, profesionales y todos
                aquellos que buscan un compañero confiable en sus jornadas
                diarias y emocionantes.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 pb-4">
            <div className="vision-box">
              <h2>Visión</h2>
              <p>
                Ser reconocidos como líderes en la industria de las mochilas,
                ofreciendo una amplia gama de productos diseñados para acompañar
                y enriquecer la vida de nuestros clientes en cada una de sus
                aventuras y actividades. Nos esforzamos por ser una marca de
                referencia que refleje innovación, calidad y estilo en cada uno
                de nuestros productos.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 pb-4">
            <div className="values-box">
              <h2>Valores</h2>
              <ul>
                <li>
                  <span>Excelencia:</span> Perseguimos la perfección y ofrecemos
                  calidad insuperable.
                </li>
                <li>
                  Innovación: Buscamos constantemente nuevas ideas y soluciones
                  originales.
                </li>
                <li>
                  Sostenibilidad: Adoptamos prácticas amigables con el medio
                  ambiente.
                </li>
                <li>
                  Autenticidad: Mantenemos la integridad en todo lo que hacemos.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5 pb-3">
        <div className="row px-xl-5">
          <div className="col-md-6">
            <div className="product-offer mb-30" style={{ height: "300px" }}>
              <img className="img-fluid" src={mochila1} alt="" />
              <div className="offer-text">
                <h3 className="text-white mb-3">
                  Descubre nuestros increibles productos
                </h3>
                <a className="btn btn-primary">Ver m&aacute;s</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-offer mb-30" style={{ height: "300px" }}>
              <img className="img-fluid" src={mochila2} alt="" />
              <div className="offer-text">
                <h3 className="text-white mb-3">
                  Descubre nuestros increibles productos
                </h3>
                <a className="btn btn-primary">Ver m&aacute;s</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
            <p className="mb-4">
              No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et
              et dolor sed dolor. Rebum tempor no vero est magna amet no
            </p>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary mr-3"></i>123
              Street, New York, USA
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary mr-3"></i>
              info@example.com
            </p>
            <p className="mb-0">
              <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345
              67890
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">
                  Quick Shop
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Home
                  </a>
                  <a className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Our Shop
                  </a>
                  <a className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Shop Detail
                  </a>
                  <a className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Shopping Cart
                  </a>
                  <a className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Checkout
                  </a>
                  <a className="text-secondary">
                    <i className="fa fa-angle-right mr-2"></i>Contact Us
                  </a>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">
                  My Account
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Home
                  </a>
                  <a className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Our Shop
                  </a>
                  <a className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Shop Detail
                  </a>
                  <a className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Shopping Cart
                  </a>
                  <a className="text-secondary mb-2">
                    <i className="fa fa-angle-right mr-2"></i>Checkout
                  </a>
                  <a className="text-secondary">
                    <i className="fa fa-angle-right mr-2"></i>Contact Us
                  </a>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">
                  Newsletter
                </h5>
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
                <h6 className="text-secondary text-uppercase mt-4 mb-3">
                  Follow Us
                </h6>
                <div className="d-flex">
                  <a className="btn btn-primary btn-square mr-2">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-primary btn-square mr-2">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-primary btn-square mr-2">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="btn btn-primary btn-square">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row border-top mx-xl-5 py-4"
          style={{ borderColor: "rgba(256, 256, 256, 0.1) !important" }}
        >
          <div className="col-md-6 px-xl-0">
            <p className="mb-md-0 text-center text-md-left text-secondary">
              &copy; <a className="text-primary">Domain</a>. All Rights
              Reserved. Designed by
              <a className="text-primary" href="https://htmlcodex.com">
                HTML Codex
              </a>
            </p>
          </div>
          <div className="col-md-6 px-xl-0 text-center text-md-right">
            <img className="img-fluid" src="img/payments.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
