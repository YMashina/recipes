import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [numResults, setNumResults] = useState(0);
  const getRecipes = useCallback(async () => {
    const options = {
      method: "GET",
      url: "https://yummly2.p.rapidapi.com/feeds/search",
      params: {
        maxResult: itemsPerPage.toString(),
        start: "18",
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
        setNumResults(response.data.totalMatchCount);
        setFeed(response.data.feed);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [searchQuery, itemsPerPage]);

  useEffect(() => {
    setIsLoading(true);
    getRecipes();
  }, [getRecipes, searchQuery, itemsPerPage]);

  const requestSearchQuery = (query) => {
    console.log(query);
    setSearchQuery(query);
  };

  return (
    <MainDiv>
      <Search
        perPage={itemsPerPage}
        changeItemsPerPage={(amount) => setItemsPerPage(amount)}
        requestSearchQuery={(query) => requestSearchQuery(query)}
      />
      {searchQuery === "" || isLoading ? null : (
        <SearchQuery>
          You searched: "{searchQuery}". Found {numResults} results.
        </SearchQuery>
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
                  description={
                    feedItem.content.description?.text
                      ? feedItem.content.description.text
                      : null
                  }
                  ingredients={feedItem.content.ingredientLines}
                  numberOfServings={feedItem.content.details.numberOfServings}
                  sourceURL={feedItem.display.source.sourceRecipeUrl}
                  rating={feedItem.content.details.rating}
                  tags={feedItem.content.tags}
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
