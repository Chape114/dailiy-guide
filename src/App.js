import React, { useState } from "react";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Home from "./pages/Home.js";
import SelectMood from "./pages/SelectMood.js";
import SelectCategory from "./pages/SelectCategory.js";
import CardSelection from "./pages/CardSelection.js";
import Result from "./pages/Result.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase.js";
import "./styles/App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [user, setUser] = useState(null);

  // Monitorear el estado de autenticación
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setCurrentPage("home");
      } else {
        setUser(null);
        setCurrentPage("login");
      }
    });
    return () => unsubscribe();
  }, []);

  // Navegación entre pantallas
  const navigateToRegister = () => setCurrentPage("register");
  const navigateToLogin = () => setCurrentPage("login");
  const navigateToStateSelection = () => setCurrentPage("state-selection");
  const navigateToCategorySelection = (mood) => {
    setSelectedMood(mood);
    setCurrentPage("category-selection");
  };
  const navigateToCardSelection = (category) => {
    setSelectedCategory(category);
    setCurrentPage("card-selection");
  };
  const navigateToResult = (card) => {
    setSelectedCard(card);
    setCurrentPage("result");
  };
  const navigateToHome = () => setCurrentPage("home");
  const logout = () => {
    auth.signOut();
    setCurrentPage("login");
  };

  return (
    <>
      {currentPage === "login" && (
        <Login
          navigateToRegister={navigateToRegister}
          navigateToHome={navigateToHome}
        />
      )}
      {currentPage === "register" && (
        <Register navigateToLogin={navigateToLogin} />
      )}
      {currentPage === "home" && (
        <Home
          navigateToStateSelection={navigateToStateSelection}
          logout={logout}
        />
      )}
      {currentPage === "state-selection" && (
        <SelectMood
          navigateToCategorySelection={navigateToCategorySelection}
        />
      )}
      {currentPage === "category-selection" && (
        <SelectCategory
          selectedMood={selectedMood}
          navigateToCardSelection={navigateToCardSelection}
        />
      )}
      {currentPage === "card-selection" && (
        <CardSelection
          selectedMood={selectedMood}
          selectedCategory={selectedCategory}
          navigateToResult={navigateToResult}
        />
      )}
      {currentPage === "result" && (
        <Result
          selectedCard={selectedCard}
          navigateToHome={navigateToHome}
        />
      )}
    </>
  );
};

export default App;
