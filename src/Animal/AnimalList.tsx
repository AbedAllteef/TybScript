import React, { useEffect, useState } from "react";
import axios from "axios";
import "./animalList.css"; // تصميم الحيوانات
import AnimalItem from "./ِAnimalItem"; // تأكد من أن هذا الملف موجود ومستور

interface Animal {
  id: number;
  name: string;
  image: { url: string };  // تعديل النوع ليكون كائن يحتوي على url
  species: string;
  status: string;
}

const AnimalList: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  // تحميل الحيوانات من Pexels API
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
          headers: {
            Authorization: "YOUR_PEXELS_API_KEY", // استبدل بـ مفتاح API الخاص بك
          },
          params: {
            query: "animal",
            per_page: 10,
          },
        });
        const fetchedAnimals = response.data.photos.map((photo: any) => ({
          id: photo.id,
          name: photo.alt,
          image: { url: photo.src.medium },  // تعديل الـ image ليكون كائنًا يحتوي على url
          species: "غير محدد", // يمكنك تعديل هذا بناءً على البيانات المتاحة
          status: "غير محدد", // يمكنك تعديل هذا بناءً على البيانات المتاحة
        }));
        setAnimals(fetchedAnimals); // تأكد من إغلاق الأقواس بشكل صحيح
      } catch (error) {
        console.error("❌ حدث خطأ أثناء تحميل البيانات", error);
      }
    };

    fetchAnimals(); 
  }, []); 
  return (
    <div className="animal-list">
      <h2>🐶 List of animals</h2>
      <div className="animal-container">
        {animals.map((animal) => (
          <AnimalItem
            key={animal.id}
            id={animal.id}
            name={animal.name}
            image={animal.image}
            species={animal.species}
            status={animal.status}
          />  
        ))}
      </div>
    </div>
  );
};

export default AnimalList;
