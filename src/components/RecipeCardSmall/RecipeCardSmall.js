import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
} from "shards-react";
import CardsImg from "../styled/CardsImg";
import CardsDiv from "../styled/CardsDiv";

const RecipeCardSmall = ({ name, image, time, ingredients, sourceURL }) => {
  return (
    <CardsDiv>
      <Card style={{ maxWidth: "20rem" }}>
        <CardBody>
          <CardsImg src={image} />
          <CardTitle>{name}</CardTitle>
          <p>Total time: {time}</p>
          <p>
            Ingredients:{" "}
            {ingredients.map(
              (ingredientItem, index) =>
                ingredientItem.ingredient +
                (index !== ingredients.length - 1 ? ", " : "")
            )}
          </p>
          <Button
            onClick={() => {
              window.open(sourceURL, "_blank");
            }}
          >
            Read more &rarr;
          </Button>
        </CardBody>
      </Card>
    </CardsDiv>
  );
};

export default RecipeCardSmall;
