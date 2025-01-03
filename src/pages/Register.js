import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase.js";
import { doc, setDoc } from "firebase/firestore";

const Register = ({ navigateToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Crear el perfil del usuario en la colección "profiles"
      await setDoc(doc(db, "profiles", user.uid), {
        email: user.email,
        name: name,
        fechaCreacion: new Date().toISOString(),
        historial: [],
      });

      // Redirigir al login después del registro
      alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
      navigateToLogin();
    } catch (err) {
      console.error("Error al registrarse:", err);
      setError("Hubo un error al registrarte. Por favor, intentá nuevamente.");
    }
  };

  return (
    <div className="register-container">
      <h2>Crear Cuenta</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tenés una cuenta?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={navigateToLogin}
        >
          Iniciar sesión
        </span>
      </p>
    </div>
  );
};

export default Register;
