import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../utils/firebase.js";

const CardSelection = ({ selectedMood, selectedCategory, navigateToResult }) => {
  const [cartasDisponibles, setCartasDisponibles] = useState([]);
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // Nuevo indicador

  // Obtener cartas desde Firestore
  useEffect(() => {
    const fetchCartas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tarjetas"));
        const cartas = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCartasDisponibles(cartas);
      } catch (err) {
        console.error("Error al obtener las cartas:", err);
      }
    };
    fetchCartas();
  }, []);

  const handleCardDraw = async () => {
    if (cartasDisponibles.length === 0 || isProcessing) {
      console.log("Intento de sacar carta bloqueado.");
      return;
    }
  
    console.log("Iniciando selección de carta...");
    setIsProcessing(true); // Bloquear nuevos clics mientras se procesa
    const randomIndex = Math.floor(Math.random() * cartasDisponibles.length);
    const carta = cartasDisponibles[randomIndex];
  
    try {
      console.log(`Carta seleccionada: ${carta.id}`);
      // Incrementar el contador de veces que ha salido
      await updateDoc(doc(db, "tarjetas", carta.id), {
        veces_salida: increment(1),
      });
  
      console.log(`Contador de tarjeta ${carta.id} incrementado.`);
      setSelectedCard(carta);
      setIsCardSelected(true);
      navigateToResult(carta); // Pasar la carta seleccionada a Result
    } catch (err) {
      console.error("Error al seleccionar la carta:", err);
    } finally {
      setIsProcessing(false); // Liberar bloqueo
    }
  };
  

  return (
    <div className="card-selection-container">
      <h1>Estado: {selectedMood}</h1>
      <h2>Categoría: {selectedCategory}</h2>
      {!isCardSelected ? (
        <>
          <p>Hacé clic en la baraja para sacar tu carta del día</p>
          <div className="card-deck" onClick={handleCardDraw}>
            <div className="card-back"></div>
          </div>
        </>
      ) : (
        <p>Sacando tu carta...</p>
      )}
    </div>
  );
};

export default CardSelection;
