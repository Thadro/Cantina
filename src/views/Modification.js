import React from "react";

class Modification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recette: {
        id: 0,
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
    this.modifier = this.modifier.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`http://localhost:9000/api/recipe/${id}`)
      .then((res) => res.json())
      .then((recipes) => {
        this.setState({ recette: recipes });
        console.log(recipes);
      });
  }
  handleInputChange(event) {
    this.setState(
      {
        recette: {
          ...this.state.recette,
          [event.target.name]: event.target.value,
        },
      }
      //   () => {
      //     console.log(this.state);
      //   }
    );
  }

  handleNumberChange(event) {
    this.setState(
      {
        recette: {
          ...this.state.recette,
          [event.target.name]: +event.target.value,
        },
      }
      //   () => {
      //     console.log(this.state);
      //   }
    );
  }

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

  modifier(event) {
    event.preventDefault();
    const requestRecipe = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.recette),
    };
    fetch(
      `http://localhost:9000/api/recipe/${this.state.recette.id}`,
      requestRecipe
    ).then((res) => {
      if (res.status === 200) {
        alert("Recette modifiée avec succés");
      } else {
        res.json().then((json) => {
          console.log(json);
          this.setState({ erreur: json.errorMessage });
        });
        //   console.log(res.json.then)
        alert("Des erreurs bg");
      }
      console.log(res);
    });

    console.log(this.state);
  }

  render() {
    return (
      <>
        <div class="add-recipe-ctnr">
          <h2>Modifier une recette</h2>
          <div>{this.state.erreur}</div>
          <form className="add-recipe">
            <div className="title-des-ctnr">
              <input
                name="titre"
                type="text"
                size="15"
                placeholder="Titre de la recette"
                value={this.state.recette.titre}
                onChange={this.handleInputChange}
                required
              />

              <input
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
                    <div key={index}>
                      <input
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
                {this.state.recette.etapes.map((etape, index) => (
                  <div className="etape" key={index}>
                    <textarea
                      className="textarea1"
                      value={etape}
                      onChange={(event) => this.handleEtapeChange(index, event)}
                      required
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
            <div>
              <input
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
                value="Modifier votre recette"
                style={{ height: 40, width: 150 }}
                onClick={(event) => this.modifier(event)}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Modification;
