import { useState } from 'react';
import axios from 'axios';
import RegisterComponent from './RegisterComponent'; // Importa el nuevo componente

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Limpiar mensaje de cierre de sesión al intentar iniciar sesión
      setLogoutMessage('');

      const response = await axios.post('https://192.168.3.117:7267/api/auth/login', {
        Email: email,
        Password: password,
      });

      if (response.status === 200) {
        console.log('Usuario autenticado:', response.data);

        localStorage.setItem('user', JSON.stringify(response.data));

      } else {
        console.error('Error al iniciar sesión:', response.data);
        // Handle other statuses (e.g., authentication failure)
      }
    } catch (error) {
      if (error.response) {
        console.error('Error al iniciar sesión:', error.response.data);
      } else if (error.request) {
        console.error('Error al realizar la solicitud:', error.request);
      } else {
        console.error('Error en la configuración de la solicitud:', error.message);
      }
    }
  };

  const handleLogout = () => {
    // Eliminar información del usuario al cerrar sesión
    localStorage.removeItem('user');
    setLogoutMessage('Sesión cerrada correctamente');

    // Otros pasos que puedas necesitar al cerrar sesión
  };
  

  const toggleView = () => {
    setShowRegister(!showRegister);
    setLogoutMessage('');

  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {showRegister ? (
          <RegisterComponent toggleView={toggleView} />
        ) : (
          <>
            <h2 style={styles.heading}>Iniciar Sesión</h2>
            {logoutMessage && <p style={styles.logoutMessage}>{logoutMessage}</p>}
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

              <button type="button" onClick={handleLogin} style={styles.loginButton}>
                Iniciar Sesión
              </button>

              <button type="button" onClick={toggleView} style={styles.registerButton}>
                Registrarse
              </button>

              {localStorage.getItem('user') && (
              <button type="button" onClick={handleLogout} style={styles.logoutButton}>
                Cerrar Sesión
              </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  logoutMessage: {
    color: 'green',
    textAlign: 'center',
    marginBottom: '10px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  formContainer: {
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  loginButton: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  registerButton: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
  },
  logoutButton: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
  },
  
};

export default AuthComponent;
