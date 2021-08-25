import { Button } from "shards-react";
import RecipePageDiv from "../styled/RecipePageDiv";

const RecipeActionButton = ({ id, clickAddRecipe, clickRemoveRecipe }) => {
  return (
    <RecipePageDiv>
      {localStorage.getItem(id) ? (
        <Button
          theme={"danger"}
          outline
          onClick={() => {
            clickRemoveRecipe();
          }}
        >
          Remove from my recipes
        </Button>
      ) : (
        <Button
          outline
          onClick={() => {
            clickAddRecipe();
          }}
        >
          Add to my recipes
        </Button>
      )}
    </RecipePageDiv>
  );
};

export default RecipeActionButton;
