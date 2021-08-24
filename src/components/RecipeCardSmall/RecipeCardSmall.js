import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import {
  Card,
  CardTitle,
  CardImg,
  CardBody,
  Button,
  CardText,
  Modal,
  ModalBody,
  ModalHeader,
} from "shards-react";
import CardsDiv from "../styled/CardsDiv";
import { useMemo, useState } from "react";
import NewWindow from "react-new-window";
import RecipePage from "../RecipePage/RecipePage";
import RecipeQuickData from "../RecipeQuickData/RecipeQuickData";

const RecipeCardSmall = ({
  id,
  name,
  image,
  time,
  video,
  preparationSteps,
  ingredients,
  sourceURL,
  description,
  numberOfServings,
  rating,
  tags,
}) => {
  const [renderNewWindow, setRenderNewWindow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const makeTagsArray = () => {
    const courseTags = tags.course
      ? tags.course.map((tag) => {
          return tag["display-name"];
        })
      : [];
    const dishTags = tags.dish
      ? tags.dish.map((tag) => tag["display-name"])
      : [];
    const techniqueTags = tags.technique
      ? tags.technique.map((tag) => tag["display-name"])
      : [];
    return [...courseTags, ...dishTags, ...techniqueTags];
  };
  const tagsDisplayArray = useMemo(() => makeTagsArray(), [tags]);

  const clickOnRecipePage = () => {
    console.log("hehehehehehe!!!!!");
  };

  return (
    <CardsDiv>
      <Card style={{ maxWidth: "20rem" }}>
        <CardImg top src={image} />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <RecipeQuickData
            time={time}
            numberOfServings={numberOfServings}
            rating={rating}
          />
          <br />
          <CardText>
            Tags:{" "}
            {tagsDisplayArray.map(
              (tagItem, index) =>
                tagItem + (index !== tagsDisplayArray.length - 1 ? ", " : "")
            )}
          </CardText>
          <Button outline theme={"secondary"} onClick={toggleModal}>
            Read more &rarr;
          </Button>
        </CardBody>
      </Card>
      <Modal open={isModalOpen} toggle={toggleModal} size={"lg"}>
        <RecipePage
          clickOnRecipePage={clickOnRecipePage}
          name={name}
          image={image}
          description={description}
          rating={rating}
          video={video}
          preparationSteps={preparationSteps}
          ingredients={ingredients}
          time={time}
          numberOfServings={numberOfServings}
        />
      </Modal>
      {renderNewWindow ? (
        <NewWindow>
          <RecipePage
            clickOnRecipePage={clickOnRecipePage}
            name={name}
            image={image}
            description={description}
            rating={rating}
            video={video}
            preparationSteps={preparationSteps}
            ingredients={ingredients}
            time={time}
            numberOfServings={numberOfServings}
          />
        </NewWindow>
      ) : null}
    </CardsDiv>
  );
};

export default RecipeCardSmall;
