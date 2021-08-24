import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import MainDiv from "../styled/MainDiv";
import Spinner from "../styled/Spinner";
import RecipeCardSmall from "../RecipeCardSmall/RecipeCardSmall";
import Search from "../Search/Search";
import {
  generateHexString,
  changeSourceUrl,
  firstHeaders,
  secondHeaders,
} from "./constants";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SearchQuery from "../styled/searchQuery";
import Pagination from "../Pagination/Pagination";
import ErrorMessage from "../Error/ErrorMessage";
import { Button } from "shards-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipePage from "../RecipePage/RecipePage";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [totalResults, setTotalResults] = useState(0);
  const [numResults, setNumResults] = useState(0);
  const [startFeed, setStartFeed] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState({
    isError: false,
    message: "",
    status: 200,
  });

  const toggleScroll = (bool) => {
    bool
      ? (document.body.style.overflow = "visible")
      : (document.body.style.overflow = "hidden");
  };

  const getRecipes = useCallback(async () => {
    const options = {
      method: "GET",
      url: `https://yummly2.p.rapidapi.com/feeds/${
        searchQuery === "" ? "list" : "search"
      }`,
      params:
        searchQuery === ""
          ? {
              start: startFeed.toString(),
              limit: itemsPerPage.toString(),
              tag: "list.recipe.popular",
            }
          : {
              maxResult: itemsPerPage.toString(),
              start: startFeed.toString(),
              q: searchQuery,
            },
      headers: secondHeaders,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log(options.params);
        setNumResults(response.data.totalMatchCount);
        setFeed(response.data.feed);
        setTotalResults(response.data.totalMatchCount);
        setError({ isError: false });
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setError({
          isError: true,
          message: error.message,
          status: error.response?.status,
        });
      });
  }, [searchQuery, itemsPerPage, startFeed]);

  useEffect(() => {
    setIsLoading(true);

    getRecipes();
  }, [getRecipes, searchQuery, itemsPerPage, startFeed]);

  const requestSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const getPage = (page) => {
    setStartFeed((page - 1) * itemsPerPage);
    setCurrentPage(page);
  };

  return (
    <MainDiv>
      <Router>
        <Switch>
          <Route path="/:id" children={<RecipePage />} />
          <Route exact path="/">
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

            {error.isError ? (
              <ErrorMessage message={error.message} status={error.status} />
            ) : null}

            {isLoading ||
            error.isError ||
            searchQuery === "" ||
            numResults === 0 ? null : (
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
              columnsCountBreakPoints={{
                300: 1,
                600: 2,
                900: 3,
                1200: 4,
                1500: 5,
              }}
            >
              <Masonry>
                {isLoading && !error.isError ? (
                  <Spinner />
                ) : (
                  feed.map((feedItem) => {
                    return (
                      <RecipeCardSmall
                        key={generateHexString()}
                        id={feedItem.content.details.id}
                        name={feedItem.display.displayName}
                        image={feedItem.display.images[0]}
                        video={{
                          snapshotUrl: feedItem.content.videos?.snapshotUrl,
                          originalVideoUrl:
                            feedItem.content.videos?.originalVideoUrl,
                        }}
                        time={feedItem.content.details.totalTime}
                        description={
                          feedItem.content.description?.text
                            ? feedItem.content.description.text
                            : null
                        }
                        ingredients={feedItem.content.ingredientLines}
                        preparationSteps={feedItem.content.preparationSteps}
                        numberOfServings={
                          feedItem.content.details.numberOfServings
                        }
                        sourceURL={changeSourceUrl(
                          feedItem.display.source.sourceRecipeUrl
                        )}
                        rating={{
                          value: feedItem.content.reviews.averageRating,
                          totalReviewCount:
                            feedItem.content.reviews.totalReviewCount,
                        }}
                        tags={feedItem.content.tags}
                        toggleScroll={toggleScroll}
                      />
                    );
                  })
                )}
              </Masonry>
            </ResponsiveMasonry>
          </Route>
        </Switch>
      </Router>
    </MainDiv>
  );
};

export default App;
