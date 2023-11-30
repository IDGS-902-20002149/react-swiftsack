import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileComponent = () => {
  const [user, setUser] = useState({
    id: 0,
    name: '',
    email: '',
    telefono: '',
  });

  useEffect(() => {
    // Obtener el usuario del localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      // Obtener el perfil del usuario desde la API
      axios.get(`https://192.168.3.117:7267/api/auth/profile/${storedUser.id}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error al obtener el perfil:', error);
        });
    }
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`https://192.168.3.117:7267/api/auth/profile/${user.id}`, user);

      if (response.status === 200) {
        console.log('Perfil actualizado:', response.data);
        // Puedes agregar lógica adicional aquí si es necesario
      } else {
        console.error('Error al actualizar el perfil:', response.data);
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Perfil de Usuario</h2>
        <form style={styles.form}>
          <label style={styles.label}>Nombre:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Email:</label>
          <input type="text" name="email" value={user.email} onChange={handleChange} style={styles.input} disabled />

          <label style={styles.label}>Teléfono:</label>
          <input type="text" name="telefono" value={user.telefono} onChange={handleChange} style={styles.input} />

          <button type="button" onClick={handleUpdateProfile} style={styles.loginButton}>
            Actualizar Perfil
          </button>
        </form>
      </div>
    </div>
  );
};


const styles = {
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
    },
  };

export default ProfileComponent;
