import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Card, Radio, Select, Input, Form } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log("blur");
}

function onFocus() {
    console.log("focus");
}

function onSearch(val) {
    console.log("search:", val);
}

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
                <div className="filter-ctnr">
                    <Form.Item name="rechercher" style={{ margin: 0, marginTop: 20 }}>
                        <Input placeholder="Rechercher" />
                    </Form.Item>
                    <Radio.Group defaultValue="Padawan" style={{ marginTop: 16 }}>
                        <Radio.Button value="Padawan">Padawan</Radio.Button>
                        <Radio.Button value="Jedi">Jedi</Radio.Button>
                        <Radio.Button value="Maitre Jedi">Maitre Jedi</Radio.Button>
                    </Radio.Group>
                    <Select
                        showSearch
                        style={{ width: 200, marginTop: 20 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                        <Option value="6">6</Option>
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                    </Select>
                    <div className="time-ctnr">
                        <label for="time">Temps de préparation</label>
                        <input type="range" className="time" name="time" min="5" max="120" />
                    </div>
                </div>
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
