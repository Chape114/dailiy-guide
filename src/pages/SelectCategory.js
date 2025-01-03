import React from "react";

const categories = ["Trabajo", "Salud", "Dinero", "Fortuna", "Decisiones", "Relaciones"];

const SelectCategory = ({ selectedMood, navigateToCardSelection }) => {
  const handleCategorySelection = (category) => {
    console.log("Estado de ánimo:", selectedMood, "Categoría seleccionada:", category);
    navigateToCardSelection(category); // Pasar la categoría al siguiente paso
  };

  return (
    <div className="select-category-container">
      <h1>¿Sobre qué querés reflexionar hoy?</h1>
      <p>Estado de ánimo: <strong>{selectedMood}</strong></p>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className="category-button"
            onClick={() => handleCategorySelection(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
