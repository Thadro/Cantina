import React from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";

function Ajouter() {
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

    return (
        <div>
            <h2>Ajouter une recette</h2>
            <Form
                name="basic"
                requiredMark={false}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off">
                <Form.Item label="Titre" name="titre" rules={[{ required: true, message: "Vous devez rentrer un titre" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Vous devez rentrer une description" }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Niveau"
                    name="niveau"
                    rules={[{ required: true, message: "Choississez le niveau entre padawan, jedi ou maître jedi" }]}>
                    <Input />
                </Form.Item>
                <div className="select-ajout-ctnr">
                    <Form.Item rules={[{ required: true, message: "Veuillez choisir le nombre de personne" }]}>
                        <Select
                            showSearch
                            style={{ width: 200, marginTop: 20 }}
                            placeholder="Nombre de personne"
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
                            <Option value="9">9</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item rules={[{ required: true, message: "Veuillez choisir le nombre de personne" }]}>
                        <Select
                            showSearch
                            style={{ width: 200, marginTop: 20 }}
                            placeholder="Temps de préparation"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            <Option value="10min">10min</Option>
                            <Option value="20min">20min</Option>
                            <Option value="30min">30min</Option>
                            <Option value="40min">40min</Option>
                            <Option value="50min">50min</Option>
                            <Option value="60min">60min</Option>
                            <Option value="70min">70min</Option>
                        </Select>
                    </Form.Item>
                </div>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Ajouter;
