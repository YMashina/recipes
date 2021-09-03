import { useLocation, useParams } from "react-router-dom";
import { Alert, Button, ModalBody } from "shards-react";
import RecipeHeading from "../styled/RecipeHeading";
import RecipePageImgRounded from "../styled/RecipePageImgRounded";
import RecipePageDiv from "../styled/RecipePageDiv";
import { generateHexString } from "../App/constants";
import RecipeQuickData from "../RecipeQuickData/RecipeQuickData";
import Scroll from "../styled/Scroll";
import { useCallback, useEffect, useState } from "react";
import RecipeActionButton from "../RecipeActionButton/RecipeActionButton";
import axios from "axios";
import Spinner from "../styled/Spinner";
import {
  makeOptions,
  prepareImages,
  clickRemoveRecipe,
  clickAddRecipe,
} from "./constants";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const RecipePage = ({
  id,
  globalId,
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
  setIsGalleryOpen,
}) => {
  const [isError, setIsError] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [images, setImages] = useState([]);
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const [showAlert, setShowAlert] = useState({
    visible: false,
    alertText: "",
    alertTheme: "",
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
    setIsGalleryOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
    setIsGalleryOpen(false);
  };

  const getImages = useCallback(async () => {
    const options = makeOptions(globalId);
    await axios
      .request(options)
      .then(function (response) {
        //console.log(response.data);
        prepareImages(response.data.reviewImages).then((response) => {
          setImages(response);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    getImages().then(() => setIsLoadingImages(false));
  }, [id]);

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
        <RecipeActionButton
          update={update}
          id={id}
          clickAddRecipe={() =>
            clickAddRecipe(
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
              setUpdate,
              update,
              setShowAlert
            )
          }
          clickRemoveRecipe={() =>
            clickRemoveRecipe(id, setUpdate, update, setShowAlert, location)
          }
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
                <RecipePageDiv key={generateHexString(4)}>
                  {index + 1}. {step}
                </RecipePageDiv>
              ))
            : "No preparation steps data."}
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
        {images.length ? <RecipeHeading>Gallery</RecipeHeading> : null}

        {isLoadingImages ? <Spinner mainPage={false} /> : null}
        {images.length ? (
          <>
            <Gallery photos={images} onClick={openLightbox} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={images.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </>
        ) : null}
      </Scroll>
    </ModalBody>
  );
};

export default RecipePage;
