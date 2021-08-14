import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import MainDiv from "../styled/MainDiv";
import Spinner from "../styled/Spinner";
import RecipeCardSmall from "../RecipeCardSmall/RecipeCardSmall";
import Search from "../Search/Search";
import { generateHexString } from "./constants";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SearchQuery from "../styled/searchQuery";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getRecipes = useCallback(async () => {
    const options = {
      method: "GET",
      url: "https://yummly2.p.rapidapi.com/feeds/search",
      params: {
        maxResult: "10",
        start: "0",
        FAT_KCALMax: "1000",
        q: searchQuery,
        maxTotalTimeInSeconds: "7200",
      },
      headers: {
        "x-rapidapi-key": "6e78af7e27mshf423b9eb8beec5ep14aa77jsnb5aca16d5d78",
        "x-rapidapi-host": "yummly2.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setFeed(response.data.feed);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    getRecipes();
  }, [getRecipes, searchQuery]);

  const requestSearchQuery = (query) => {
    console.log(query);
    setSearchQuery(query);
  };

  return (
    <MainDiv>
      <Search requestSearchQuery={(query) => requestSearchQuery(query)} />
      {searchQuery === "" ? null : (
        <SearchQuery>You searched: "{searchQuery}".</SearchQuery>
      )}

      {isLoading === true || feed.length > 0 ? null : (
        <SearchQuery>Sorry, nothing found.</SearchQuery>
      )}

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 300: 1, 600: 2, 900: 3, 1200: 4, 1500: 5 }}
      >
        <Masonry>
          {isLoading ? (
            <Spinner />
          ) : (
            feed.map((feedItem) => {
              return (
                <RecipeCardSmall
                  key={generateHexString()}
                  name={feedItem.display.displayName}
                  image={feedItem.display.images[0]}
                  time={feedItem.content.details.totalTime}
                  ingredients={feedItem.content.ingredientLines}
                  sourceURL={feedItem.display.source.sourceRecipeUrl}
                />
              );
            })
          )}
        </Masonry>
      </ResponsiveMasonry>
    </MainDiv>
  );
};

export default App;
