import { useEffect, useState } from "react";
import RecipeCardSmall from "../RecipeCardSmall/RecipeCardSmall";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ErrorMessage from "../Error/ErrorMessage";

const MyRecipes = () => {
  const [isError, setIsError] = useState(false);
  return (
    <>
      {isError ? <ErrorMessage message={"Something went wrong."} /> : null}
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          300: 1,
          600: 2,
          900: 3,
          1200: 4,
          1500: 5,
        }}
      >
        <Masonry>
          {!isError
            ? Object.keys(localStorage).map((key) => {
                try {
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
                    tags,
                  } = JSON.parse(localStorage.getItem(key));
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
                      tags={tags}
                    />
                  );
                } catch (e) {
                  setIsError(true);
                }
                console.log(localStorage.getItem(key));
              })
            : null}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};
export default MyRecipes;
