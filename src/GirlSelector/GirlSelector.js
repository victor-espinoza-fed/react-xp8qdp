import React, { useState } from "react";
import categories from "../girls";
import GirlDetail from "./GirlDetail";
import styled from "@emotion/styled";

const Dropdown = styled.select`
  background-color: transparent;
  border-color: white;
  border-radius: 6px;
  padding: 5px;
  text-align: center;
  color: white;
  line-height: 14px;
  font-size: 14px;
  margin-top: 15px;
`;
const Container = styled.div`
  background-color: #444;
  width: 100%;
  text-align: center;
`;
const Item = styled.option`
  background-color: #444;
  padding: 30px;
  margin: 30px;
  border-bottom: 1px solid red;
`;
const Button = styled.button`
  border-radius: 50%;
  border: 1px solid white;
  margin-bottom: 15px;
  margin-left: 5px;
  color: white;
  background-color: #244a90;
  padding: 5px 9px;
  cursor: pointer;
  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`;

const GirlSelector = ({ category = "softtek" }) => {
  const girls = categories[category];
  const options = girls.map(girl => (
    <Item key={girl.id} value={girl.id}>
      {girl.name}
    </Item>
  ));

  const getRandomName = girl => {
    const random = ~~(Math.random() * girls.length - 1);
    const { id } = girls[random];
    if (id !== girl) return id;
    else return getRandomName(girl);
  };
  const [girl, setGirl] = useState(getRandomName());
  const onChange = e => {
    const { currentTarget } = e;
    const { value } = currentTarget;
    setGirl(value);
  };

  return (
    <Container>
      <Dropdown onChange={onChange} value={girl}>
        {options}
      </Dropdown>
      <Button
        onClick={() => {
          setGirl(getRandomName(girl));
        }}
      >
        &#x21bb;
      </Button>
      <GirlDetail category={category} selectedGirl={girl} />
    </Container>
  );
};

export default GirlSelector;
