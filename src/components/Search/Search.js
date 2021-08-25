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
} from "shards-react";
import { useEffect, useState } from "react";
import NavbarWidth from "../styled/NavbarWidth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchGoButtonIcon from "../styled/SearchGoButtonIcon";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";

const Search = ({ requestSearchQuery, changeItemsPerPage, perPage = 10 }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [myRecipesActive, setMyRecipesActive] = useState(false);
  const location = useLocation();
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const history = useHistory();

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

  const toggleActive = (bool) => {
    setMyRecipesActive(bool);
  };

  return (
    <Navbar type="light" theme="none" expand="md">
      <NavbarBrand
        href="/"
        onClick={() => {
          history.push("/"); //removing Link doesn't fix the Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
          //toggleActive(false);
        }}
      >
        Yummly recipes
      </NavbarBrand>

      <Nav navbar>
        <NavItem onClick={setMyRecipesActive}>
          <NavLink href={"/my-recipes"} active={myRecipesActive}>
            My recipes
          </NavLink>
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
  );
};

export default withRouter(Search);
