import { db } from './firebase.js'; // Asegúrate de incluir la extensión .js
import { doc, setDoc } from 'firebase/firestore';

const tarjetas = [
  { numero: 1, texto: "Confía en ti mismo y todo será posible.", icono: "🌟" },
  { numero: 2, texto: "El éxito llega a quienes se esfuerzan.", icono: "🚀" },
  { numero: 3, texto: "Cada día es una nueva oportunidad.", icono: "🌅" },
  { numero: 4, texto: "La perseverancia siempre da frutos.", icono: "🌱" },
  { numero: 5, texto: "Sigue adelante, lo mejor está por venir.", icono: "🌈" },
];

async function insertarTarjetas() {
  try {
    for (const tarjeta of tarjetas) {
      const tarjetaRef = doc(db, 'tarjetas', `tarjeta-${tarjeta.numero}`);
      await setDoc(tarjetaRef, {
        numero: tarjeta.numero,
        texto: tarjeta.texto,
        icono: tarjeta.icono,
      });
      console.log(`Tarjeta #${tarjeta.numero} insertada correctamente.`);
    }
    alert('Tarjetas insertadas correctamente en la base de datos.');
  } catch (error) {
    console.error('Error al insertar las tarjetas:', error);
    alert('Hubo un error al insertar las tarjetas. Verifica la consola para más detalles.');
  }
}

export default insertarTarjetas; // Exportación por defecto
