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

  const [hintData, setHintData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(true);

    getHintData();
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
    }
  };

  useEffect(() => {
    setMyRecipesActive(location.pathname === "/my-recipes");
  }, [location.pathname]);

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
                onChange={handleChange}
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
      {isLoading ? null : (
        <SuggestionsList>
          <ListGroup small>
            {hintData.map((hint) => (
              <ListGroupItem action key={generateHexString(4)}>
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
