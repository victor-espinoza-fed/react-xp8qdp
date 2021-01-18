import React from "react";
import categories from "../girls";
import styled from "@emotion/styled";
import { useState } from "react";

const Card = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 20px;
  font-family: Trebuchet MS, sans-serif;
`;
const Link = styled.a`
  color: #9898dc;
  font-weight: bold;
`;
const Label = styled.p`
  display: inline-block;
  font-size: 16px;
  line-height: 0.1rem;
  font-weight: bold;
  margin-right: 10px;
`;
const Button = styled.button`
  border-radius: 50%;
  border: 1px solid white;
  margin-bottom: 15px;
  color: white;
  background-color: #349a70;
  padding: 5px 10px;
  cursor: pointer;
  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`;
const Star = styled.button`
  border: none;
  margin-bottom: 15px;
  color: white;
  background-color: transparent;
  cursor: pointer;
  font-size: 25px;
  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`;

const GirlDetail = ({ selectedGirl, category = "softtek" }) => {
  const girls = categories[category];
  const selected = girls.find(i => i.id === selectedGirl) || girls[0];
  const getImageId = (selected, id) => {
    const { photos = [] } = selected;
    const { length = 0 } = photos;
    const newId = typeof id === "number" ? id + 1 : 0;
    // const random = ~~(Math.random() * length);
    // if (id !== random) return random;
    // else return getImageId(selected, id);
    return newId >= length ? 0 : newId;
  };

  const getImage = (selected, imageId = 0) => {
    const { photos = [] } = selected;
    const image = photos[imageId];
    return image;
  };
  const [imageId, setImageId] = useState(getImageId(selected));
  const [image, setImage] = useState(getImage(selected, imageId));
  const setFavorite = () => {
    console.log("favorite", imageId);
  };

  const detalles = selected ? (
    <Card>
      <Label>
        <div>
          <Button
            onClick={() => {
              setImageId(getImageId(selected, imageId));
              setImage(getImage(selected, imageId));
            }}
          >
            &#x21bb;
          </Button>
        </div>
        <img src={image} alt={selected.name} width="100%" />
        <div>
          <Star onClick={setFavorite}>&#9734;</Star>
        </div>
      </Label>
      <Label>
        <Link
          href={selected.facebook}
          rel="noopener noreferrer"
          target="_blank"
        >
          Facebook
        </Link>
      </Label>
      <Label>
        <Link
          href={selected.instagram}
          rel="noopener noreferrer"
          target="_blank"
        >
          Instagram
        </Link>
      </Label>
      <Label>
        <Link
          href={selected.googlePhotos}
          rel="noopener noreferrer"
          target="_blank"
        >
          Photos
        </Link>
      </Label>
    </Card>
  ) : (
    ""
  );
  return <div>{detalles}</div>;
};

export default GirlDetail;
