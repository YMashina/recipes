import { useParams } from "react-router-dom";
import { Button } from "shards-react";
import RecipeHeading from "../styled/RecipeHeading";
import RecipePageStyleDiv from "../styled/RecipePageStyleDiv";
import RecipePageImgRounded from "../styled/RecipePageImgRounded";

const RecipePage = ({
  clickOnRecipePage,
  name,
  image,
  description,
  ingredients,
  preparationSteps,
  video,
  rating,
}) => {
  const { id } = useParams();
  console.log(ingredients);
  console.log(preparationSteps);
  return (
    <RecipePageStyleDiv>
      <RecipePageImgRounded src={image} />
      <RecipeHeading>{name}</RecipeHeading>
      <p>{description}</p>

      <Button
        onClick={() => {
          clickOnRecipePage();
        }}
      >
        Test me
      </Button>
      <h3>ID: {id}</h3>
    </RecipePageStyleDiv>
  );
};

export default RecipePage;
