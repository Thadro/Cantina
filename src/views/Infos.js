import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";

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
        <div className="infos-global-ctnr">
            {recette && (
                <div className="img-des-ctnr">
                    <img alt="image recette" src={recette.photo}></img>
                    <div className="infos-icon-ctnr">
                        <div className="infos-icon">
                            <FieldTimeOutlined />
                            <p>{recette.tempsPreparation} min</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Infos;
