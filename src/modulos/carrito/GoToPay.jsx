import "./Carrito.css";

const GoToPay = () => {
  return (
    <div className="mt-5 pt-5">
      <div className="row">
        <div className="col-6">
          <div className="card">
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
                Some placeholder content for the collapse component. This panel
                is hidden by default but revealed when the user activates the
                relevant trigger.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoToPay;
