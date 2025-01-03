import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase.js";
import insertarTarjetas from "../utils/insertarTarjetas.js"; // Importar la función para insertar tarjetas

const Home = ({ navigateToStateSelection, logout }) => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userProfileRef = doc(db, "profiles", user.uid);
          const docSnap = await getDoc(userProfileRef);
          if (docSnap.exists()) {
            setHistorial(docSnap.data().historial || []);
          } else {
            console.error("No se encontró el perfil del usuario");
          }
        }
      } catch (err) {
        console.error("Error al obtener el historial:", err);
      }
    };
    fetchHistorial();
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenido a Daily Guide</h1>
      <button className="primary-button" onClick={navigateToStateSelection}>
        Ver mi destino
      </button>

      <h2>Tu historial</h2>
      <div className="card-list">
        {historial.map((item, index) => (
          <div className="card" key={index}>
            <p>{item.carta}</p>
            <span>Estado: {item.estadoAnimo}</span>
            <span>Categoría: {item.categoria}</span>
            <span>Fecha: {new Date(item.fecha).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <button className="secondary-button" onClick={logout}>
        Cerrar sesión
      </button>

      <button className="secondary-button" onClick={insertarTarjetas}>
        Insertar Tarjetas
      </button>
    </div>
  );
};

export default Home;
