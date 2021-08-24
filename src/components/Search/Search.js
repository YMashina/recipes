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

const Search = ({ requestSearchQuery, changeItemsPerPage, perPage = 10 }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      requestSearchQuery(searchQuery);
    }
  };

  return (
    <Navbar type="light" theme="none" expand="md">
      <NavbarBrand href="/">Yummly recipes</NavbarBrand>
      <Nav navbar>
        <NavItem>
          <NavLink active href="/my-recipes">
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

export default Search;
