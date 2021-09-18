import React from "react";

function Ajouter() {
  return (
    <div class="add-recipe-ctnr">
      <h2>Ajouter une recette</h2>
      <form className="add-recipe">
        <div className="title-des-ctnr">
          <input
            name="add title"
            type="text"
            size="15"
            placeholder="Titre de la recette"
          />
          <input
            name="add description"
            type="text"
            size="25"
            placeholder="Description de la recette"
          />
        </div>
        <div className="first-select-ctnr">
          <select>
            <option value="" disabled selected>
              Choississez le niveau de difficulté
            </option>
            <option value="padawan">Padawan</option>
            <option value="jedi">Jedi</option>
            <option value="maître jedi">Maître Jedi</option>
          </select>
          <select>
            <option value="" disabled selected>
              Choississez le nombre de personne
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <select>
            <option value="" disabled selected>
              Temps de préparation (en minute)
            </option>
            <option value="10min">10</option>
            <option value="20min">20</option>
            <option value="30min">30</option>
            <option value="40min">40</option>
            <option value="50min">50</option>
            <option value="60min">60</option>
            <option value="70min">70</option>
            <option value="80min">80</option>
          </select>
        </div>
        <div className="quantite-etape-ctnr">
          <div className="quantite-global-ctnr">
            <div className="quantite-ctnr">
              <input
                name="quantité"
                type="number"
                size="5"
                placeholder="Quantité"
              />
              <select>
                <option value="" disabled selected>
                  Quantité
                </option>
                <option value="g">g</option>
                <option value="cl">cl</option>
                <option value="quantité">Nb</option>
                <option value="cuillère">Cuillère à café</option>
              </select>
              <input
                className="ingredient-supp"
                type="button"
                value="X"
                style={{ height: 40, width: 40 }}
              />
            </div>
            <input
              className="ingredient-add"
              type="button"
              value="Ajouter un ingredient"
              style={{ height: 30, width: 150 }}
            />
          </div>
          <div className="etape-global-ctnr">
            <div className="etape-ctnr">
              <textarea className="textarea1"></textarea>
              <input
                className="etape-supp"
                type="button"
                value="X"
                style={{ height: 40, width: 40, margin: 0 }}
              />
            </div>
            <input
              className="ajouter-etape"
              type="button"
              value="Ajouter une étape"
              style={{ height: 40, width: 150, marginTop: 50 }}
            />
          </div>
        </div>
        <input
          className="modifier-btn"
          type="submit"
          value="Ajouter la recette"
          style={{ height: 40, width: 150 }}
        />
      </form>
    </div>
  );
}

export default Ajouter;
