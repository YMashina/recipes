import { useLocation, useParams } from "react-router-dom";
import { Alert, Button, ModalBody } from "shards-react";
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
import RecipeActionButton from "../RecipeActionButton/RecipeActionButton";

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
  tags,
}) => {
  const [isError, setIsError] = useState(false);
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const [showAlert, setShowAlert] = useState({
    visible: false,
    alertText: "",
    alertTheme: "",
  });

  const clickAddRecipe = () => {
    try {
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
          tags,
        })
      );
      setUpdate(!update);
      setShowAlert({
        visible: true,
        alertText: "Recipe added successfully",
        alertTheme: "success",
      });
      showAlertFunction();
    } catch (e) {
      setShowAlert({
        visible: true,
        alertText: "Something went wrong while adding",
        alertTheme: "danger",
      });
      showAlertFunction();
    }
  };

  const clickRemoveRecipe = (id) => {
    try {
      localStorage.removeItem(id);

      setUpdate(!update);
      setShowAlert({
        visible: true,
        alertText: "Recipe removed successfully",
        alertTheme: "success",
      });
      showAlertFunction();
      setTimeout(() => {
        if (location.pathname === "/my-recipes") window.location.reload();
      }, 2000);
    } catch (e) {
      setShowAlert({
        visible: true,
        alertText: "Something went wrong while removing",
        alertTheme: "danger",
      });
      showAlertFunction();
    }
  };
  let interval = null;
  const showAlertFunction = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      setShowAlert({ visible: false });
      clearInterval(interval);
      interval = null;
    }, 2000);
  };

  return (
    <ModalBody>
      <Scroll>
        <Alert
          className="mb-3"
          open={showAlert.visible}
          theme={showAlert.alertTheme}
        >
          {showAlert.alertText}
        </Alert>
        <RecipePageImgRounded src={image} />
        <RecipeHeading>{name}</RecipeHeading>
        <RecipePageDiv>
          <RecipeQuickData
            time={time ? time : null}
            numberOfServings={numberOfServings ? numberOfServings : null}
            rating={rating ? rating : null}
          />
        </RecipePageDiv>

        <RecipeActionButton
          update={update}
          id={id}
          clickAddRecipe={clickAddRecipe}
          clickRemoveRecipe={() => clickRemoveRecipe(id)}
        />

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

        <RecipeActionButton
          update={update}
          id={id}
          clickAddRecipe={clickAddRecipe}
          clickRemoveRecipe={() => clickRemoveRecipe(id)}
        />

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
