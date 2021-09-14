import React from "react";
import { useState, useEffect } from "react";

const Accueil = () => {
  const [recettes, setRecettes] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/api/recipes")
      .then((res) => res.json())
      .then((recipes) => {
        setRecettes(recipes);
        console.log(recipes);
      });
  }, []);

  return (
    <div className="App">
      <h1>Liste des recettes</h1>
      {recettes &&
        recettes.map((recette) => (
          <div key={recette.id}>
            <h2>{recette.titre}</h2>
            <p>{recette.description}</p>
          </div>
        ))}
    </div>
  );
};

export default Accueil;
