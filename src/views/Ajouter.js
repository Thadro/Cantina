import React from "react";

class Ajouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recette: {
        titre: "",
        description: "",
        niveau: "",
        personnes: "",
        tempsPreparation: "",
        ingredients: [],
        etapes: [],
        photo: "",
      },
      erreur: "",
    };

    // HandleInputChange => bind(this) renvoie une fonction avec le this définit par défaut
    // Ce qui permet d'utiliser this.setState, State etc, this = instance de la class Ajouter

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    // Ingredient
    this.addIngredient = this.addIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.handleIngredientQuantityChange =
      this.handleIngredientQuantityChange.bind(this);
    this.handleIngredientNameChange =
      this.handleIngredientNameChange.bind(this);
    // Etape
    this.addEtape = this.addEtape.bind(this);
    this.deleteEtape = this.deleteEtape.bind(this);
    this.handleEtapeChange = this.handleEtapeChange.bind(this);
    this.ajouter = this.ajouter.bind(this);
  }

  // Permet de gérer le changement des différents champs

  handleInputChange(event) {
    this.setState({
      recette: {
        ...this.state.recette,
        // [] remplace le contenu par event.target.name
        [event.target.name]: event.target.value,
      },
    });
  }

  handleNumberChange(event) {
    this.setState({
      recette: {
        ...this.state.recette,
        [event.target.name]: +event.target.value,
      },
    });
  }

  // Permet d'interagir avec les ingredients

  addIngredient() {
    const ingredients = this.state.recette.ingredients;
    ingredients.push(["", ""]);
    this.setState({ ...this.state });
  }

  deleteIngredient(index) {
    const ingredients = this.state.recette.ingredients;
    ingredients.splice(index, 1);
    this.setState({ ...this.state });
  }

  handleIngredientQuantityChange(index, event) {
    const ingredients = this.state.recette.ingredients;
    ingredients[index][0] = event.target.value;
    this.setState({ ...this.state });
  }

  handleIngredientNameChange(index, event) {
    const ingredients = this.state.recette.ingredients;
    ingredients[index][1] = event.target.value;
    this.setState({ ...this.state });
  }

  // Permet d'interagir avec les étapes

  addEtape() {
    const etapes = this.state.recette.etapes;
    etapes.push("");
    this.setState({ ...this.state });
  }

  deleteEtape(index) {
    const etapes = this.state.recette.etapes;
    etapes.splice(index, 1);
    this.setState({ ...this.state });
  }

  handleEtapeChange(index, event) {
    const etapes = this.state.recette.etapes;
    etapes[index] = event.target.value;
    this.setState({ ...this.state });
  }

  // Fonction qui permet d'ajouter une recette dans la base de donné de l'API

  ajouter(event) {
    const requestRecipe = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.recette),
    };
    fetch("http://localhost:9000/api/recipes", requestRecipe).then((res) => {
      if (res.status === 201) {
        alert("Recette crée avec succés");
      } else {
        res.json().then((json) => {
          this.setState({ erreur: json.errorMessage });
        });
        alert("Error");
      }
    });
  }

  render() {
    return (
      <>
        <div class="add-recipe-ctnr">
          <h2>Ajouter une recette</h2>
          <div>{this.state.erreur}</div>
          <form className="add-recipe">
            <div className="title-des-ctnr">
              <input
                className="input"
                name="titre"
                type="text"
                size="15"
                placeholder="Titre de la recette"
                value={this.state.recette.titre}
                onChange={this.handleInputChange}
                required
              />

              <input
                className="input"
                name="description"
                type="text"
                size="25"
                placeholder="Description de la recette"
                value={this.state.recette.description}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="first-select-ctnr">
              <select
                className="select"
                name="niveau"
                value={this.state.recette.niveau}
                onChange={this.handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Choississez le niveau de difficulté
                </option>
                <option value="padawan">Padawan</option>
                <option value="jedi">Jedi</option>
                <option value="maitre">Maître Jedi</option>
              </select>
              <select
                className="select"
                name="personnes"
                value={this.state.recette.personnes}
                onChange={this.handleNumberChange}
                required
              >
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
              <select
                className="select"
                name="tempsPreparation"
                value={this.state.recette.tempsPreparation}
                onChange={this.handleNumberChange}
                required
              >
                <option value="" disabled selected>
                  Temps de préparation (en minute)
                </option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
              </select>
            </div>
            <div className="quantite-etape-ctnr">
              <div className="quantite-global-ctnr">
                <div className="quantite-ctnr">
                  {this.state.recette.ingredients.map((ingredient, index) => (
                    <div key={index} className="quantite">
                      <input
                        className="input"
                        name="quantité"
                        type="text"
                        placeholder="Quantité"
                        value={ingredient[0]}
                        onChange={(event) =>
                          this.handleIngredientQuantityChange(index, event)
                        }
                        required
                      />
                      <input
                        className="input"
                        name="name"
                        type="text"
                        placeholder="Ingredient"
                        value={ingredient[1]}
                        onChange={(event) =>
                          this.handleIngredientNameChange(index, event)
                        }
                        required
                      />
                      <input
                        className="supprimer-btn"
                        type="button"
                        value="X"
                        style={{ height: 40, width: 40 }}
                        onClick={() => this.deleteIngredient(index)}
                      />
                    </div>
                  ))}
                </div>
                <input
                  className="ajouter-etape"
                  type="button"
                  value="Ajouter un ingredient"
                  style={{ height: 30, width: 150 }}
                  onClick={this.addIngredient}
                />
              </div>
            </div>
            <div className="etape-global-ctnr">
              <div className="etape-ctnr">
                {/* Map permettant d'avoir plusieurs étapes possible ou d'en supprimer */}

                {this.state.recette.etapes.map((etape, index) => (
                  <div className="etape" key={index}>
                    <textarea
                      className="textarea1"
                      value={etape}
                      onChange={(event) => this.handleEtapeChange(index, event)}
                      required
                    ></textarea>
                    <input
                      className="supprimer-btn"
                      type="button"
                      value="X"
                      style={{
                        height: 40,
                        width: 40,
                        marginBottom: 0,
                        marginLeft: 5,
                      }}
                      onClick={() => this.deleteEtape(index)}
                    />
                  </div>
                ))}
                <input
                  className="ajouter-etape"
                  type="button"
                  value="Ajouter une étape"
                  style={{ height: 40, width: 150, marginTop: 50 }}
                  onClick={this.addEtape}
                />
              </div>
            </div>
            <div>
              <input
                className="input"
                type="text"
                value={this.state.recette.photo}
                name="photo"
                onChange={this.handleInputChange}
                size="50"
                placeholder="Photo de la recette"
              />
            </div>
            <div className="button-modif-ctnr">
              <input
                className="modifier-btn"
                type="submit"
                value="Ajouter votre recette"
                style={{ height: 40, width: 150 }}
                onClick={this.ajouter}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Ajouter;
