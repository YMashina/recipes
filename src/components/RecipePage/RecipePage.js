import { useParams } from "react-router-dom";
import { Button, ModalBody } from "shards-react";
import RecipeHeading from "../styled/RecipeHeading";
import RecipePageStyleDiv from "../styled/RecipePageStyleDiv";
import RecipePageImgRounded from "../styled/RecipePageImgRounded";
import { Container, Row, Col } from "shards-react";
import IngredientTable from "../styled/IngredientTable";
import RecipePageDiv from "../styled/RecipePageDiv";
import { generateHexString } from "../App/constants";
import RecipeQuickData from "../RecipeQuickData/RecipeQuickData";
import Scroll from "../styled/Scroll";
import { useState } from "react";

const RecipePage = ({
  id,
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
}) => {
  const [isError, setIsError] = useState(false);

  const clickAddRecipe = () => {
    localStorage.setItem(
      id,
      JSON.stringify({
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
      })
    );
  };

  return (
    <ModalBody>
      <Scroll>
        <RecipePageImgRounded src={image} />
        <RecipeHeading>{name}</RecipeHeading>
        <RecipePageDiv>
          <RecipeQuickData
            time={time ? time : null}
            numberOfServings={numberOfServings ? numberOfServings : null}
            rating={rating ? rating : null}
          />
        </RecipePageDiv>

        <RecipePageDiv>
          <Button
            outline
            onClick={() => {
              clickAddRecipe();
            }}
          >
            Add to my recipes
          </Button>
        </RecipePageDiv>

        <RecipePageDiv>
          {description ? description : "No description."}
        </RecipePageDiv>
        <RecipePageDiv>
          <ul>
            {ingredients
              ? ingredients.map((ingredient) => (
                  <li key={generateHexString()}>
                    <div>
                      {ingredient.amount.metric.quantity}{" "}
                      {ingredient.amount.metric.unit.abbreviation}{" "}
                      {ingredient.ingredient}
                    </div>
                  </li>
                ))
              : "No ingredients data."}
          </ul>
        </RecipePageDiv>
        <RecipePageDiv>
          {preparationSteps
            ? preparationSteps.map((step, index) => (
                <RecipePageDiv>
                  {index + 1}. {step}
                </RecipePageDiv>
              ))
            : "No preparation steps data."}
        </RecipePageDiv>
        <RecipePageDiv>
          <Button
            outline
            onClick={() => {
              clickAddRecipe();
            }}
          >
            Add to my recipes
          </Button>
        </RecipePageDiv>
        {video.originalVideoUrl && !isError ? (
          <RecipePageDiv>
            <video width="100%" controls>
              <source
                src={video.originalVideoUrl}
                type="video/mp4"
                onError={() => {
                  console.log(
                    "Sorry, the video is currently unavailable: " +
                      video.originalVideoUrl
                  );
                  setIsError(true);
                }}
              />
              Your browser does not support HTML video.
            </video>
          </RecipePageDiv>
        ) : null}
        {isError ? <div>Sorry, the video is currently unavailable.</div> : null}
      </Scroll>
    </ModalBody>
  );
};

export default RecipePage;
