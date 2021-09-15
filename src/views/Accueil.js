import React from "react";
import { useState, useEffect } from "react";

import { Card, Radio, Select, Input, Form } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

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
                <div className="filter-ctnr">
                    <Form.Item name="rechercher" className="search-bar">
                        <Input placeholder="Rechercher" />
                    </Form.Item>
                    <Radio.Group defaultValue="Padawan" style={{ marginTop: 16 }}>
                        <Radio.Button value="Padawan">Padawan</Radio.Button>
                        <Radio.Button value="Jedi">Jedi</Radio.Button>
                        <Radio.Button value="Maitre Jedi">Maitre Jedi</Radio.Button>
                    </Radio.Group>
                    <Select
                        showSearch
                        style={{ width: 200 }}
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
                </div>
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

{
    /* <div className="radio-ctnr">
                        <div className="radio-btn">
                            <input type="radio" name="drone" value="Padawan" className="input-radio" checked />
                            <label for="Padawan">Padawan</label>
                        </div>
                        <div className="radio-btn">
                            <input type="radio" name="drone" value="Jedi" className="input-radio" checked />
                            <label for="Jedi">Jedi</label>
                        </div>
                        <div className="radio-btn">
                            <input type="radio" name="drone" value="Maître Jedi" className="input-radio" checked />
                            <label for="Mâitre Jedi">Maître Jedi</label>
                        </div>
                    </div> */
}
