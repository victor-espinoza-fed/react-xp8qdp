import React, { useState } from "react";
import GirlSelector from "./GirlSelector/GirlSelector";
import "./style.css";
import styled from "@emotion/styled";

const Dropdown = styled.select`
  background-color: black;
  border-color: white;
  border-radius: 6px;
  padding: 5px;
  text-align: center;
  color: white;
  line-height: 14px;
  font-size: 14px;
  margin: 15px;
  width: 100%;
  text-align: center;
  margin-top: 5px;
`;
const Item = styled.option`
  background-color: #444;
  padding: 30px;
  margin: 30px;
  border-bottom: 1px solid red;
`;

const categories = [
  { id: "softtek", name: "Softtek - 1 Division" },
  { id: "mex1", name: "México - 1 Division" },
  { id: "social", name: "Social - 1 Division" },
  { id: "close", name: "Close - 1 Division" }
];

function App() {
  const [category, setCategory] = useState("mex1");
  const options = categories.map(category => (
    <Item key={category.id} value={category.id}>
      {category.name}
    </Item>
  ));
  const onChange = e => {
    const { currentTarget } = e;
    const { value } = currentTarget;
    console.log(value);
    setCategory(value);
  };
  return (
    <div className="App" style={{ backgroundColor: "#444", margin: 0 }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          textAlign: "center",
          marginLeft: "15px",
          paddingTop: "15px"
        }}
      >
        Category:
      </div>
      <div style={{ width: "100%", display: "flex" }}>
        <Dropdown onChange={onChange} value={category}>
          {options}
        </Dropdown>
      </div>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "50%", display: "flex" }}>
          <GirlSelector category={category} />
        </div>
        <div style={{ width: "50%", display: "flex" }}>
          <GirlSelector category={category} />
        </div>
      </div>
    </div>
  );
}

export default App;
