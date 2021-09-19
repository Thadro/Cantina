import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Card } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Accueil = () => {
  let history = useHistory();

  // Destructuration => recette indice[0], setRecette indice[1]

  const [recettes, setRecettes] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [niveau, setNiveau] = useState("");
  const [minPersonne, setMinPersonne] = useState("");
  const [maxPersonne, setMaxPersonne] = useState("");
  const [tempsPrep, setTempsPrep] = useState("");

  // Fonction pour gérer les filtres
  const filter = (recette) => {
    console.log(recette, recherche);
    return (
      recette.titre.toLowerCase().includes(recherche.toLowerCase()) &&
      (niveau === "" || recette.niveau === niveau) &&
      (minPersonne === "" || recette.personnes >= +minPersonne) &&
      (maxPersonne === "" || recette.personnes <= +maxPersonne) &&
      (tempsPrep === "" || recette.tempsPreparation <= +tempsPrep)
    );
  };

  // Permet de gérer le changement des différents champs
  const handleChange = (event) => {
    setRecherche(event.target.value);
  };

  const handleNiveau = (event) => {
    setNiveau(event.target.value);
  };

  const handleMinPersonne = (event) => {
    setMinPersonne(event.target.value);
  };

  const handleMaxPersonne = (event) => {
    setMaxPersonne(event.target.value);
  };

  const handleTempsPrep = (event) => {
    setTempsPrep(event.target.value);
  };

  // Function permettant de supprimer une recette de l'api + tableau

  const supprimer = (id) => {
    const deleteRecipe = {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(null),
    };
    fetch(`http://localhost:9000/api/recipe/${id}`, deleteRecipe).then(
      (res) => {
        if (res.status === 200) {
          recettes.splice(
            recettes.findIndex((recette) => recette.id === id),
            1
          );
          setRecettes([...recettes]);
          alert("Recette supprimée avec succés");
        }
      }
    );
  };

  // Permet de récupérer les infos de l'api

  useEffect(() => {
    fetch("http://localhost:9000/api/recipes")
      .then((res) => res.json())
      .then((recipes) => {
        setRecettes(recipes);
      });
  }, []);

  return (
    <>
      <div className="App">
        <h1 className="titre-accueil">Liste des recettes</h1>
        <form className="filter-ctnr">
          <input
            name="recherche"
            type="text"
            size="15"
            placeholder="Nom de la recette"
            value={recherche}
            onChange={handleChange}
          />
          <select value={niveau} onChange={handleNiveau}>
            <option value="">Choississez votre niveau de difficulté</option>
            <option value="padawan">Padawan</option>
            <option value="jedi">Jedi</option>
            <option value="maitre">Maître Jedi</option>
          </select>
          <select value={minPersonne} onChange={handleMinPersonne}>
            <option value="">Min Personne</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <select value={maxPersonne} onChange={handleMaxPersonne}>
            <option value="">Max Personne</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <select value={tempsPrep} onChange={handleTempsPrep}>
            <option value="">Temps de péparation</option>
            <option value="10">Moins de 10 min</option>
            <option value="20">Moins de 20 min</option>
            <option value="30">Moins de 30 min</option>
            <option value="40">Moins de 40 min</option>
            <option value="50">Moins de 50 min</option>
            <option value="60">Moins de 60 min</option>
            <option value="70">Moins de 70 min</option>
            <option value="80">Moins de 80 min</option>
          </select>
        </form>
        <div className="recette-ctnr">
          {/* Map me permettant d'afficher la totalité des recettes présentes dans l'api */}

          {recettes &&
            recettes.filter(filter).map((recette) => (
              <Card
                style={{ width: 300, margin: 25 }}
                cover={<img alt="example" src={recette.photo} />}
                actions={[
                  <EyeOutlined
                    key="details"
                    onClick={() => history.push(`/recette/${recette.id}`)}
                  />,
                  <EditOutlined
                    key="modify"
                    onClick={() => history.push(`/recette/edit/${recette.id}`)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    className="delete-btn"
                    onClick={() => supprimer(recette.id)}
                  />,
                ]}
              >
                <Meta title={recette.titre} />
                <div className="infos-card-ctnr">
                  <p>Niveau de force requis : {recette.niveau}</p>
                  <p>
                    Pour {recette.personnes}
                    {recette.personnes > 1 ? " personnes" : " personne"}
                  </p>
                  <p>{recette.tempsPreparation}min de préparation</p>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default Accueil;
