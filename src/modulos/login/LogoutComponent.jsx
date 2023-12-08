import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LogoutComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      sessionStorage.removeItem("userData");
      console.log("Sesión cerrada correctamente");

      Swal.fire({
        title: "Logout",
        text: "Sesión finalizada correctamente",
        icon: "success", // Puedes cambiar el icono según tus necesidades (success, error, warning, info, etc.)
        confirmButtonText: "Ok",
      });

      navigate("/");
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default LogoutComponent;

// import { useState } from 'react';

// const LogoutComponent = () => {
//   const [logoutMessage, setLogoutMessage] = useState('');

//   const handleLogout = () => {
//     // Eliminar información del usuario al cerrar sesión
//     sessionStorage.removeItem('userData');
//     setLogoutMessage('Sesión cerrada correctamente');

//     // Otros pasos que puedas necesitar al cerrar sesión
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <h2 style={styles.heading}>Cerrar Sesión</h2>
//         {logoutMessage && <p style={styles.logoutMessage}>{logoutMessage}</p>}
//         <button type="button" onClick={handleLogout} style={styles.logoutButton}>
//           Cerrar Sesión
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   logoutMessage: {
//     color: 'green',
//     textAlign: 'center',
//     marginBottom: '10px',
//   },
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//   },
//   formContainer: {
//     width: '300px',
//     padding: '20px',
//     borderRadius: '10px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     backgroundColor: '#fff',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '20px',
//     color: '#333',
//   },
//   logoutButton: {
//     backgroundColor: '#000',
//     color: '#fff',
//     borderRadius: '5px',
//     padding: '10px',
//     cursor: 'pointer',
//   },
// };

// export default LogoutComponent;
