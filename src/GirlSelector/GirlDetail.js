import React from "react";
import categories from "../girls";
import styled from "@emotion/styled";
import { useState } from "react";
import firebase from '../firebase';
import Uploader from "../Uploader/Uploader";

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
  display: block;
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
  const getPhotos = () => (
    firebase.storage().ref('images').root.child(`images/${selectedGirl}`).listAll()
  );

  const getImageId = async (selected, id) => {
    const photosChidas = await getPhotos();
    const { items } = photosChidas;
    const { length = 0 } = items;
    const newId = typeof id === "number" ? id + 1 : 0;
    const currentId = newId >= length ? 0 : newId;
    return currentId;
  };

  const getImage = async(imageId = 0) => {
    const photosChidas = await getPhotos();
    const { items } = photosChidas;
    let image = '';
    if (items.length) image = await items[imageId].getDownloadURL();
    setImage(image);
  };

  const [imageId, setImageId] = useState(0);
  const [image, setImage] = useState('');
  const setFavorite = () => {
    console.log("favorite", imageId);
  };

  const detalles = selected ? (
    <Card>
      <div style={{padding: '15px'}} >
        <Uploader url={`images/${selected.id}`}/>
      </div>
      <Label>
        <div>
          <Button
            onClick={async () => {
              const id = await getImageId(selected, imageId);
              setImageId(id);
              getImage(id);
            }}
          >
            &#x21bb;
          </Button>
        </div>
        {image && <img src={image} alt={selected.name} width="100%" />}
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
