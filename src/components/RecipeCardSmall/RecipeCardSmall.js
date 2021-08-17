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
import { useMemo } from "react";
import RatingStarIcon from "../styled/RatingStarIcon";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farStar,
  faStarHalf,
} from "@fortawesome/free-regular-svg-icons";
import RatingValue from "../styled/RatingValue";

const RecipeCardSmall = ({
  name,
  image,
  time,
  ingredients,
  sourceURL,
  description,
  numberOfServings,
  rating,
  tags,
}) => {
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
              <ReactStars
                value={rating}
                edit={false}
                size={24}
                isHalf={true}
                emptyIcon={<FontAwesomeIcon icon={farStar} />}
                halfIcon={<FontAwesomeIcon icon={faStarHalf} />}
                fullIcon={<FontAwesomeIcon icon={faStar} />}
                activeColor="#ffd700"
              />
              <RatingValue>{rating}</RatingValue>
            </IconBlock>
          </div>

          <CardText>
            Tags:{" "}
            {tagsDisplayArray.map(
              (tagItem, index) =>
                tagItem + (index !== tagsDisplayArray.length - 1 ? ", " : "")
            )}
          </CardText>

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
