import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Card } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Accueil = () => {
    let history = useHistory();

    const [recettes, setRecettes] = useState(null);

    useEffect(() => {
        fetch("http://localhost:9000/api/recipes")
            .then(res => res.json())
            .then(recipes => {
                setRecettes(recipes);
            });
    }, []);

    return (
        <>
            <div className="App">
                <h1 className="titre-accueil">Liste des recettes</h1>
                <form className="filter-ctnr">
                    <input name="search to" type="text" size="15" placeholder="Nom de la recette" />
                    <select>
                        <option value="" disabled selected>
                            Choississez votre niveau de difficulté
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
                            Temps de péparation
                        </option>
                        <option value="10min">Moins de temps de 10 min</option>
                        <option value="20min">Moins de temps de 20 min</option>
                        <option value="30min">Moins de temps de 30 min</option>
                        <option value="40min">Moins de temps de 40 min</option>
                        <option value="50min">Moins de temps de 50 min</option>
                        <option value="60min">Moins de temps de 60 min</option>
                        <option value="70min">Moins de temps de 70 min</option>
                        <option value="80min">Moins de temps de 80 min</option>
                    </select>
                </form>
                <div className="recette-ctnr">
                    {recettes &&
                        recettes.map(recette => (
                            <Card
                                style={{ width: 300, margin: 25 }}
                                cover={<img alt="example" src={recette.photo} />}
                                actions={[
                                    <EyeOutlined key="details" onClick={() => history.push(`/recette/${recette.id}`)} />,
                                    <EditOutlined key="modify" />,
                                    <DeleteOutlined key="delete" className="delete-btn" />,
                                ]}>
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
