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
  CardText,
  CardDeck,
  CardLink,
} from "shards-react";
import CardsImg from "../styled/CardsImg";
import CardsDiv from "../styled/CardsDiv";
import Icon from "../styled/Icon";
import IconBlock from "../styled/IconBlock";
import { useMemo, useState } from "react";
import RatingStarIcon from "../styled/RatingStarIcon";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farStar,
  faStarHalf,
} from "@fortawesome/free-regular-svg-icons";
import RatingValue from "../styled/RatingValue";
import StarsDiv from "../styled/StarsDiv";
import { Link } from "react-router-dom";
import { roundReviewValue } from "./constants";
import NewWindow from "react-new-window";
import RecipePage from "../RecipePage/RecipePage";

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
          <div>
            <IconBlock>
              <Icon src={"clock-time.png"} />
              <IconBlock> {time}</IconBlock>
            </IconBlock>
            <IconBlock>
              <Icon src={"numberOfServings.png"} />
              <IconBlock> {numberOfServings}</IconBlock>
            </IconBlock>
            <IconBlock>
              <StarsDiv>
                <ReactStars
                  value={rating.value}
                  edit={false}
                  size={24}
                  isHalf={true}
                  emptyIcon={<FontAwesomeIcon icon={farStar} />}
                  halfIcon={<FontAwesomeIcon icon={faStarHalf} />}
                  fullIcon={<FontAwesomeIcon icon={faStar} />}
                  activeColor="#ffd700"
                />
              </StarsDiv>

              <RatingValue>{roundReviewValue(rating.value)}</RatingValue>
            </IconBlock>
            {roundReviewValue(rating.totalReviewCount)} votes
          </div>
          <br />
          <CardText>
            Tags:{" "}
            {tagsDisplayArray.map(
              (tagItem, index) =>
                tagItem + (index !== tagsDisplayArray.length - 1 ? ", " : "")
            )}
          </CardText>
          <Button onClick={() => setRenderNewWindow(true)}>
            Read more &rarr;
          </Button>
        </CardBody>
      </Card>
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
          />
        </NewWindow>
      ) : null}
    </CardsDiv>
  );
};

export default RecipeCardSmall;
