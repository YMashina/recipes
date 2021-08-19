import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import MainDiv from "../styled/MainDiv";
import Spinner from "../styled/Spinner";
import RecipeCardSmall from "../RecipeCardSmall/RecipeCardSmall";
import Search from "../Search/Search";
import { generateHexString, changeSourceUrl } from "./constants";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SearchQuery from "../styled/searchQuery";
import Pagination from "../Pagination/Pagination";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [numResults, setNumResults] = useState(0);
  const [startFeed, setStartFeed] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const getRecipes = useCallback(async () => {
    const options = {
      method: "GET",
      url: "https://yummly2.p.rapidapi.com/feeds/search",
      params: {
        maxResult: itemsPerPage.toString(),
        start: startFeed.toString(),
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
        setTotalResults(response.data.totalMatchCount);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [searchQuery, itemsPerPage, startFeed]);

  useEffect(() => {
    setIsLoading(true);

    getRecipes();
  }, [getRecipes, searchQuery, itemsPerPage, startFeed]);

  const requestSearchQuery = (query) => {
    console.log(query);
    setSearchQuery(query);
  };

  console.log("startFeed" + startFeed);

  const getPage = (page) => {
    setStartFeed(startFeed + (page - 1) * itemsPerPage + 1);
    setCurrentPage(page);
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
      {isLoading ? null : (
        <Pagination
          totalResults={totalResults}
          itemsPerPage={itemsPerPage}
          getPage={(page) => {
            getPage(page);
          }}
          currentPage={currentPage}
        />
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
                  sourceURL={changeSourceUrl(
                    feedItem.display.source.sourceRecipeUrl
                  )}
                  rating={{
                    value: feedItem.content.reviews.averageRating,
                    totalReviewCount: feedItem.content.reviews.totalReviewCount,
                  }}
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
