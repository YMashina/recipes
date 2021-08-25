import { useEffect, useState } from "react";
import RecipeCardSmall from "../RecipeCardSmall/RecipeCardSmall";

const MyRecipes = () => {
  const [myRecipesData, setMyRecipesData] = useState();
  useEffect(() => {
    setMyRecipesData(Object.entries(localStorage));
  }, []);

  return (
    <>
      {Object.keys(localStorage).map((key) => {
        const {
          name,
          image,
          description,
          ingredients,
          preparationSteps,
          video,
          rating,
          time,
          numberOfServings,
          toggleScroll,
          tags,
        } = JSON.parse(localStorage.getItem(key));
        console.log(localStorage.getItem(key));
        return (
          <RecipeCardSmall
            name={name}
            image={image}
            description={description}
            ingredients={ingredients}
            preparationSteps={preparationSteps}
            video={video}
            rating={rating}
            time={time}
            numberOfServings={numberOfServings}
            toggleScroll={toggleScroll}
            tags={tags}
          />
        );
      })}
    </>
  );
};
export default MyRecipes;
