import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const RegisterComponent = ({ toggleView }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://127.0.0.1:7267/api/Auth/register",

        //const response = await axios.post('https://192.168.3.117:7267/api/auth/register',
        {
          name,
          Email: email,
          Password: password,
          Telefono: telefono,
          active: true,
          confirmed_at: new Date().toISOString(),
          roleId: 3,
        }
      );

      if (response.status === 200) {
        console.log("Registro exitoso:", response.data);
        toggleView(); // Cambiar a la vista de inicio de sesión después del registro exitoso
        // Puedes agregar más lógica aquí si es necesario
      } else {
        console.error("Error al registrar:", response.data);
        // Handle other statuses or errors during registration
      }
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Registrarse</h2>
        <form style={styles.form}>
          <label style={styles.label}>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

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

          <label style={styles.label}>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={styles.input}
          />

          <button
            type="button"
            onClick={handleRegister}
            style={styles.registerButton}
          >
            Registrarse
          </button>

          <button type="button" onClick={toggleView} style={styles.loginButton}>
            Volver a Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: '50vh',
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
  registerButton: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  loginButton: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
  },
};

export default RegisterComponent;
