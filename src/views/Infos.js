import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { StarOutlined, TeamOutlined, FieldTimeOutlined } from "@ant-design/icons";

function Infos() {
    let { id } = useParams();

    const [recette, setRecettes] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:9000/api/recipe/${id}`)
            .then(res => res.json())
            .then(recipes => {
                setRecettes(recipes);
                console.log(recipes);
            });
    }, []);

    return (
        <>
            <div className="infos-global-ctnr">
                {recette && (
                    <div className="img-des-ctnr">
                        <h2>{recette.titre}</h2>
                        <h3>{recette.description}</h3>
                        <img alt="recette image" src={recette.photo}></img>
                        <h4>{recette.etapes}</h4>
                    </div>
                )}
                {recette && (
                    <div className="infos-recette-ctnr">
                        <div className="infos-recette">
                            <StarOutlined />
                            <p>{recette.niveau}</p>
                        </div>

                        <div className="infos-recette">
                            <TeamOutlined />
                            <p>{recette.personnes > 1 ? " personnes" : " personne"}</p>
                        </div>
                        <div className="infos-recette">
                            <FieldTimeOutlined />
                            <p>{recette.tempsPreparation} min</p>
                        </div>

                        <div className="ingredients-recette">
                            <h3>Liste des ingredients : </h3>
                            {recette &&
                                recette.ingredients.map(ingredient => (
                                    <p>
                                        {`${ingredient[0]} `}
                                        {ingredient[1]}
                                    </p>
                                ))}
                        </div>
                        <div className="button-ctnr">
                            <input className="modifier-btn" type="button" value="Modifier" style={{ height: 40, width: 150 }} />
                            <input className="supprimer-btn" type="button" value="Supprimer" style={{ height: 40, width: 150 }} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Infos;
