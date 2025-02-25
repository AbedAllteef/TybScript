import React from "react";

interface AnimalProps {
  id: number;
  name: string;
  image: { url: string };  
  species: string;
  status: string;
}

const AnimalItem: React.FC<AnimalProps> = ({ name, image, species, status }) => {
  const defaultImage = "https://via.placeholder.com/200"; 

  return (
    <div className="animal-item">
      <img
        src={image?.url || defaultImage} 
        alt={name}
      />
      <h3>{name}</h3>
      <p><strong>النوع:</strong> {species}</p>
      <p><strong>الحالة:</strong> {status}</p>
    </div>
  );
};

export default AnimalItem;
