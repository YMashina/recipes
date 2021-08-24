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

const RecipePage = ({
  clickOnRecipePage,
  name,
  image,
  description,
  ingredients,
  preparationSteps,
  video,
  rating,
  time,
  numberOfServings,
}) => {
  const { id } = useParams();
  console.log(ingredients);
  console.log(preparationSteps);
  return (
    <ModalBody>
      <RecipePageDiv>
        <RecipePageImgRounded src={image} />
        <RecipeHeading>{name}</RecipeHeading>
        <RecipePageDiv>
          <RecipeQuickData
            time={time}
            numberOfServings={numberOfServings}
            rating={rating}
          />
        </RecipePageDiv>

        <RecipePageDiv>
          <Button
            outline
            onClick={() => {
              clickOnRecipePage();
            }}
          >
            Add to my recipes
          </Button>
        </RecipePageDiv>

        <RecipePageDiv>{description}</RecipePageDiv>
        <RecipePageDiv>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={generateHexString()}>
                <div>
                  {ingredient.amount.metric.quantity}{" "}
                  {ingredient.amount.metric.unit.abbreviation}{" "}
                  {ingredient.ingredient}
                </div>
              </li>
            ))}
          </ul>
        </RecipePageDiv>
        <RecipePageDiv>
          {preparationSteps.map((step, index) => (
            <RecipePageDiv>
              {index + 1}. {step}
            </RecipePageDiv>
          ))}
        </RecipePageDiv>

        <Button
          outline
          onClick={() => {
            clickOnRecipePage();
          }}
        >
          Add to my recipes
        </Button>
      </RecipePageDiv>
    </ModalBody>
  );
};

export default RecipePage;
