import {
  Button,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
} from "shards-react";
import { useCallback, useEffect, useState } from "react";
import NavbarWidth from "../styled/NavbarWidth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchGoButtonIcon from "../styled/SearchGoButtonIcon";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import axios from "axios";
import {
  generateHexString,
  secondHeaders,
  thirdHeaders,
} from "../App/constants";
import { Hint } from "react-autocomplete-hint";
import SuggestionsList from "../styled/SuggestionsList";

const Search = ({ requestSearchQuery, changeItemsPerPage, perPage = 10 }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [myRecipesActive, setMyRecipesActive] = useState(false);
  const location = useLocation();
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const history = useHistory();
  const [showHintData, setShowHintData] = useState(false);
  const [hintData, setHintData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(null);

  const getHintData = useCallback(async () => {
    const options = {
      method: "GET",
      url: "https://yummly2.p.rapidapi.com/feeds/auto-complete",
      params: { q: searchQuery },
      headers: thirdHeaders,
    };

    axios
      .request(options)
      .then(function (response) {
        setHintData(response.data.searches);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    if (searchQuery) {
      getHintData().then(() => {
        setIsLoading(false);
      });
      setActiveSuggestionIndex(null);
    }
  }, [searchQuery]);

  const searchClick = (searchQuery) => {
    requestSearchQuery(searchQuery);
    history.push("/");
    setMyRecipesActive(false);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      requestSearchQuery(searchQuery);
      history.push("/");
      setMyRecipesActive(false);
      setShowHintData(false);
      if (activeSuggestionIndex !== null)
        setSearchQuery(hintData[activeSuggestionIndex]);
    }
    if (e.keyCode === 38) {
      console.log("keyup");

      setActiveSuggestionIndex(
        activeSuggestionIndex <= hintData.length - 1
          ? activeSuggestionIndex - 1
          : hintData.length - 1
      );
      if (activeSuggestionIndex === null) {
        setActiveSuggestionIndex(0);
        return;
      }
      if (activeSuggestionIndex <= 0)
        setActiveSuggestionIndex(hintData.length - 1);
      if (
        activeSuggestionIndex > 0 &&
        activeSuggestionIndex <= hintData.length - 1
      )
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    if (e.keyCode === 40) {
      console.log("keydown");
      if (activeSuggestionIndex === null) {
        setActiveSuggestionIndex(0);
        return;
      }

      if (
        activeSuggestionIndex >= 0 &&
        activeSuggestionIndex < hintData.length - 1
      )
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      if (activeSuggestionIndex >= hintData.length - 1)
        setActiveSuggestionIndex(0);
    }
  };

  useEffect(() => {
    setMyRecipesActive(location.pathname === "/my-recipes");
  }, [location.pathname]);

  const checkOnBlur = (event) => {
    console.log(event);
    if (event.relatedTarget?.id === "searchSuggestion") {
      return;
    }
    console.log("setting ShowHintData");
    setShowHintData(false);
  };
  console.log(showHintData);
  return (
    <>
      <Navbar type="light" theme="none" expand="md">
        <Link to={"/"}>
          <NavbarBrand
            onClick={() => {
              //history.push("/"); //removing Link doesn't fix the Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
              //toggleActive(false);
            }}
          >
            Yummly recipes
          </NavbarBrand>
        </Link>

        <Nav navbar>
          <NavItem onClick={setMyRecipesActive}>
            <Link to={"/my-recipes"}>
              <NavLink active={myRecipesActive}>My recipes</NavLink>
            </Link>
          </NavItem>
        </Nav>

        <Nav navbar className="ml-auto">
          <NavbarWidth>
            <InputGroup seamless>
              <InputGroupAddon type="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroupText>
              </InputGroupAddon>
              <FormInput
                className="border-0"
                placeholder="Search recipes..."
                value={searchQuery}
                onKeyPress={handleKeypress}
                onKeyDown={handleKeypress}
                onChange={handleChange}
                onClick={() => setShowHintData(true)}
                onBlur={(e) => checkOnBlur(e)}
              />

              <InputGroupAddon type="append">
                <Button
                  className="border-0"
                  theme="light"
                  outline
                  onClick={() => searchClick(searchQuery)}
                >
                  <SearchGoButtonIcon>&#5171;</SearchGoButtonIcon>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </NavbarWidth>
        </Nav>
      </Navbar>
      {isLoading || showHintData ? null : (
        <SuggestionsList>
          <ListGroup small>
            {hintData.map((hint, index) => (
              <ListGroupItem
                id="searchSuggestion"
                tabIndex="0"
                action
                active={index === activeSuggestionIndex}
                theme="light"
                key={generateHexString(4)}
                onClick={() => {
                  console.log("123");
                  setSearchQuery(hint);
                  setShowHintData(false);
                }}
              >
                {hint}
              </ListGroupItem>
            ))}
          </ListGroup>
        </SuggestionsList>
      )}
    </>
  );
};

export default withRouter(Search);
