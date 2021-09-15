import React from "react";
import { useState, useEffect } from "react";

import { Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Accueil = () => {
    const [recettes, setRecettes] = useState(null);

    useEffect(() => {
        fetch("http://localhost:9000/api/recipes")
            .then(res => res.json())
            .then(recipes => {
                setRecettes(recipes);
                console.log(recipes);
            });
    }, []);

    return (
        <>
            <div className="App">
                <h1 className="titre-accueil">Liste des recettes</h1>
                <form class="search-container">
                    <input type="text" className="search-bar" />
                </form>
                <div className="recette-ctnr">
                    {recettes &&
                        recettes.map(recette => (
                            <Card
                                style={{ width: 300, margin: 25 }}
                                cover={<img alt="example" src={recette.photo} />}
                                actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}>
                                <Meta title={recette.titre} description={recette.description} />
                            </Card>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Accueil;
