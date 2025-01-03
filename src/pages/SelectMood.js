import React from "react";

const moods = [
  "Feliz",
  "Triste",
  "Pensativo",
  "Nervioso",
  "Alegre",
  "Optimista",
  "Pesimista",
];

const SelectMood = ({ navigateToCategorySelection }) => {
  const handleMoodSelection = (mood) => {
    console.log("Estado de ánimo seleccionado:", mood);
    navigateToCategorySelection(mood); // Pasar el estado de ánimo al siguiente paso
  };

  return (
    <div className="select-mood-container">
      <h1>¿Cómo te sentís hoy?</h1>
      <div className="mood-list">
        {moods.map((mood) => (
          <button
            key={mood}
            className="mood-button"
            onClick={() => handleMoodSelection(mood)}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectMood;
