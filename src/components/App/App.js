import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import MainDiv from "../styled/MainDiv";
import Spinner from "../styled/Spinner";
import RecipeCardSmall from "../RecipeCardSmall/RecipeCardSmall";
import CardsDiv from "../styled/CardsDiv";
import Search from "../Search/Search";
import { makeFeed } from "./constants";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [feed, setFeed] = useState([]);

  const getRecipes = useCallback(async () => {
    const options = {
      method: "GET",
      url: "https://yummly2.p.rapidapi.com/feeds/search",
      params: {
        maxResult: "10",
        start: "0",
        FAT_KCALMax: "1000",
        q: "chicken",
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
        /*
        let feedState = [];
        const groupSize = response.data.feed.length / 3;
        while (response.data.feed.length > 0) {
          feedState.push(response.data.feed.splice(0, groupSize));
        }*/
        setFeed(makeFeed(response.data.feed, 3));
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  return (
    <MainDiv>
      <Search />
      <CardsDiv>
        <Container>
          <Row>
            {isLoading ? (
              <Spinner />
            ) : (
              feed.map((feedGroup) => {
                return (
                  <Col>
                    {feedGroup.map((feedItem) => (
                      <Row>
                        <RecipeCardSmall
                          name={feedItem.display.displayName}
                          image={feedItem.display.images[0]}
                          time={feedItem.content.details.totalTime}
                          ingredients={feedItem.content.ingredientLines}
                          sourceURL={feedItem.display.source.sourceRecipeUrl}
                        />
                      </Row>
                    ))}
                  </Col>
                );
              })
            )}
          </Row>
        </Container>
      </CardsDiv>
    </MainDiv>
  );
}

export default App;
