import { fourthHeaders } from "../App/constants";
import reactImageSize from "react-image-size";

const getSize = async (imageUrl) => {
  return reactImageSize(imageUrl);
};

export const prepareImages = async (imagesToCopy) => {
  const images = [...imagesToCopy];
  let preparedImages = [];
  for (const image of images) {
    const { width, height } = await getSize(image.resizableImageUrl).catch(
      (e) => console.error(e)
    );
    preparedImages.push({
      src: image.resizableImageUrl,
      width: width,
      height: height,
    });
  }
  return preparedImages;
};

export const makeOptions = (globalId) => {
  return {
    method: "GET",
    url: "https://yummly2.p.rapidapi.com/reviews/list",
    params: {
      limit: "15",
      globalId: globalId,
      offset: "0",
    },
    headers: fourthHeaders,
  };
};

export const clickRemoveRecipe = (
  id,
  setUpdate,
  update,
  setShowAlert,
  location
) => {
  try {
    localStorage.removeItem(id);
    setUpdate(!update);
    setShowAlert({
      visible: true,
      alertText: "Recipe removed successfully",
      alertTheme: "success",
    });
    setTimeout(() => {
      if (location.pathname === "/my-recipes") window.location.reload();
    }, 2000);
  } catch (e) {
    setShowAlert({
      visible: true,
      alertText: "Something went wrong while removing",
      alertTheme: "danger",
    });
  }
};

export const clickAddRecipe = (
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
) => {
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
  } catch (e) {
    setShowAlert({
      visible: true,
      alertText: "Something went wrong while adding",
      alertTheme: "danger",
    });
  }
};
