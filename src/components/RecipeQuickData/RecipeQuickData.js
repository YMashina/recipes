import IconBlock from "../styled/IconBlock";
import Icon from "../styled/Icon";
import StarsDiv from "../styled/StarsDiv";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as farStar,
  faStarHalf,
} from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import RatingValue from "../styled/RatingValue";
import { roundReviewValue } from "../RecipeCardSmall/constants";

const RecipeQuickData = ({ time, numberOfServings, rating }) => {
  return (
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
  );
};

export default RecipeQuickData;
