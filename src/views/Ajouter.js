import React from "react";

class Ajouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titre: "",
      description: "",
      niveau: "",
      personnes: "",
      tempsPreparation: "",
      ingredients: [],
      etapes: [],
    };

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

  handleInputChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value,
      }
      //   () => {
      //     console.log(this.state);
      //   }
    );
  }

  handleNumberChange(event) {
    this.setState(
      {
        [event.target.name]: +event.target.value,
      }
      //   () => {
      //     console.log(this.state);
      //   }
    );
  }

  addIngredient() {
    const ingredients = this.state.ingredients;
    ingredients.push(["", ""]);
    this.setState({ ...this.state });
  }

  deleteIngredient(index) {
    const ingredients = this.state.ingredients;
    ingredients.splice(index, 1);
    this.setState({ ...this.state });
  }

  handleIngredientQuantityChange(index, event) {
    const ingredients = this.state.ingredients;
    ingredients[index][0] = event.target.value;
    this.setState({ ...this.state });
  }

  handleIngredientNameChange(index, event) {
    const ingredients = this.state.ingredients;
    ingredients[index][1] = event.target.value;
    this.setState({ ...this.state });
  }

  addEtape() {
    const etapes = this.state.etapes;
    etapes.push([""]);
    this.setState({ ...this.state });
  }

  deleteEtape(index) {
    const etapes = this.state.etapes;
    etapes.splice(index, 1);
    this.setState({ ...this.state });
  }

  handleEtapeChange(index, event) {
    const etapes = this.state.etapes;
    etapes[index][0] = event.target.value;
    this.setState({ ...this.state });
  }

  ajouter(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <>
        <div class="add-recipe-ctnr">
          <h2>Ajouter une recette</h2>
          <form className="add-recipe">
            <div className="title-des-ctnr">
              <input
                name="titre"
                type="text"
                size="15"
                placeholder="Titre de la recette"
                value={this.state.titre}
                onChange={this.handleInputChange}
              />
              <input
                name="description"
                type="text"
                size="25"
                placeholder="Description de la recette"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="first-select-ctnr">
              <select
                name="niveau"
                value={this.state.niveau}
                onChange={this.handleInputChange}
              >
                <option value="" disabled selected>
                  Choississez le niveau de difficulté
                </option>
                <option value="padawan">Padawan</option>
                <option value="jedi">Jedi</option>
                <option value="maitre">Maître Jedi</option>
              </select>
              <select
                name="personnes"
                value={this.state.personnes}
                onChange={this.handleNumberChange}
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
                name="tempsPreparation"
                value={this.state.tempsPreparation}
                onChange={this.handleNumberChange}
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
                  {this.state.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <input
                        name="quantité"
                        type="text"
                        placeholder="Quantité"
                        value={ingredient[0]}
                        onChange={(event) =>
                          this.handleIngredientQuantityChange(index, event)
                        }
                      />
                      <input
                        name="name"
                        type="text"
                        placeholder="Ingredient"
                        value={ingredient[1]}
                        onChange={(event) =>
                          this.handleIngredientNameChange(index, event)
                        }
                      />
                      <input
                        className="quantité"
                        type="button"
                        value="X"
                        style={{ height: 40, width: 40 }}
                        onClick={() => this.deleteIngredient(index)}
                      />
                    </div>
                  ))}
                </div>
                <input
                  className="ingredient-add"
                  type="button"
                  value="Ajouter un ingredient"
                  style={{ height: 30, width: 150 }}
                  onClick={this.addIngredient}
                />
              </div>
            </div>
            <div className="etape-global-ctnr">
              <div className="etape-ctnr">
                {this.state.etapes.map((etape, index) => (
                  <div className="etape">
                    <textarea
                      className="textarea1"
                      onChange={(event) => this.handleEtapeChange(index, event)}
                    ></textarea>
                    <input
                      className="etape-supp"
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
            <div className="button-modif-ctnr">
              <input
                className="modifier-btn"
                type="submit"
                value="Ajouter votre recette"
                style={{ height: 40, width: 150 }}
                onClick={(event) => this.ajouter(event)}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Ajouter;
