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
import { useState } from "react";
import NavbarWidth from "../styled/NavbarWidth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchGoButtonIcon from "../styled/SearchGoButtonIcon";
import { Link, useHistory, withRouter } from "react-router-dom";

const Search = ({ requestSearchQuery, changeItemsPerPage, perPage = 10 }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const history = useHistory();

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      requestSearchQuery(searchQuery);
      history.push("/");
    }
  };

  return (
    <Navbar type="light" theme="none" expand="md">
      <Link to={"/"}>
        <NavbarBrand>Yummly recipes</NavbarBrand>
      </Link>

      <Nav navbar>
        <NavItem>
          <Link to={"/my-recipes"}>
            <NavLink active>My recipes</NavLink>
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
                onClick={() => requestSearchQuery(searchQuery)}
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
