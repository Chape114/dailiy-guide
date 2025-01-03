import React, { useEffect, useRef } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../utils/firebase.js";

const Result = ({ selectedCard, navigateToHome }) => {
  const hasSaved = useRef(false); // Usamos useRef para evitar múltiples ejecuciones

  useEffect(() => {
    const saveToFirestore = async () => {
      if (hasSaved.current) {
        console.log("Guardado bloqueado. Ya en proceso.");
        return; // Evitar doble ejecución
      }
      hasSaved.current = true; // Marcamos como procesado

      try {
        console.log("Iniciando guardado en Firestore...");
        const user = auth.currentUser;
        if (user) {
          const userProfileRef = doc(db, "profiles", user.uid);

          // Recuperar historial actual
          const docSnap = await getDoc(userProfileRef);
          let historialActual = [];
          if (docSnap.exists()) {
            historialActual = docSnap.data().historial || [];
          }

          // Información del historial a agregar
          const historialItem = {
            tarjetaId: selectedCard.id, // ID de la tarjeta
            fecha: new Date().toISOString(), // Fecha actual
          };

          // Verificar si ya existe
          const yaExiste = historialActual.some(
            (item) =>
              item.tarjetaId === historialItem.tarjetaId &&
              new Date(item.fecha).toDateString() ===
                new Date(historialItem.fecha).toDateString()
          );

          if (!yaExiste) {
            console.log("Agregando nueva entrada al historial...");
            await updateDoc(userProfileRef, {
              historial: arrayUnion(historialItem),
            });
          } else {
            console.log("La tirada ya existe en el historial.");
          }
        } else {
          console.error("Usuario no autenticado");
        }
      } catch (err) {
        console.error("Error al guardar en Firestore:", err);
      }
    };

    if (selectedCard && !hasSaved.current) {
      saveToFirestore();
    }
  }, [selectedCard]);

  return (
    <div className="result-container">
      <h1>Tu carta del día</h1>
      <div className="card-display">
        <p>{selectedCard.texto}</p>
        <img src={`path_to_icons/${selectedCard.icono}.png`} alt="Icono" />
      </div>
      <div className="result-buttons">
        <button onClick={navigateToHome}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default Result;
