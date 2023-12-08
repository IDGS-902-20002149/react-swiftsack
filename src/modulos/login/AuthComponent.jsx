import RegisterComponent from "./RegisterComponent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Eliminar información del usuario al cerrar sesión
  //   localStorage.removeItem("user");
  //   setLogoutMessage("Sesión cerrada correctamente");
  //   // Otros pasos que puedas necesitar al cerrar sesión
  // };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7267/api/auth/login",
        {
          Email: email,
          Password: password,
        }
      );

      if (response.status === 200) {
        console.log("Usuario autenticado:", response.data);

        sessionStorage.setItem("userData", JSON.stringify(response.data));
        console.log(
          "Usuario almacenado en sessionStorage:",
          sessionStorage.getItem("userData")
        );

        Swal.fire({
          title: "Login",
          text: "Sesión iniciada correctamente",
          icon: "success", // Puedes cambiar el icono según tus necesidades (success, error, warning, info, etc.)
          confirmButtonText: "Ok",
        });

        navigate("/");
      } else {
        console.error("Error al iniciar sesión:", response.data);
        Swal.fire({
          title: "Error al iniciar sesión",
          text: response.data.message,
          icon: "error", // Puedes cambiar el icono según tus necesidades (success, error, warning, info, etc.)
          confirmButtonText: "Ok",
        });

      }
    } catch (error) {
      if (error.response) {
        console.log(JSON.stringify(error));

        console.error("Error al iniciar sesión:", error.response.data.message);
        Swal.fire({
          title: "Error al iniciar sesión",
          text: error.response.data.message,
          icon: "error", // Puedes cambiar el icono según tus necesidades (success, error, warning, info, etc.)
          confirmButtonText: "Ok",
        });
      } else if (error.request) {
        console.error("Error al realizar la solicitud:", error.request);
        Swal.fire({
          title: "Error al realizar la solicitud",
          text: "Error al realizar la solicitud al servidor",
          icon: "error", // Puedes cambiar el icono según tus necesidades (success, error, warning, info, etc.)
          confirmButtonText: "Ok",
        });
      } else {
        console.error(
          "Error en la configuración de la solicitud:",
          error.message
        );
        Swal.fire({
          title: "Error en la configuración de la solicitud",
          text: "Error en la configuración de la solicitud",
          icon: "error", // Puedes cambiar el icono según tus necesidades (success, error, warning, info, etc.)
          confirmButtonText: "Ok",
        });
      }
    }
  };

  const toggleView = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {showRegister ? (
          <RegisterComponent toggleView={toggleView} />
        ) : (
          <>
            <h2 style={styles.heading}>Iniciar Sesión</h2>
            <form style={styles.form}>
              <label style={styles.label}>Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />

              <label style={styles.label}>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />

              <button
                type="button"
                onClick={handleLogin}
                style={styles.loginButton}
              >
                Iniciar Sesión
              </button>

              <button
                type="button"
                onClick={toggleView}
                style={styles.registerButton}
              >
                Registrarse
              </button>
              {/* {localStorage.getItem("user") && (
                <button
                  type="button"
                  onClick={handleLogout}
                  style={styles.logoutButton}
                >
                  Cerrar Sesión
                </button>
              )} */}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  formContainer: {
    width: "300px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  loginButton: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  registerButton: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
  },
  loggedInMessage: {
    textAlign: "center",
    color: "green",
    marginBottom: "10px",
  },
};

export default AuthComponent;
