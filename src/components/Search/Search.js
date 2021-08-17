import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormInput,
  InputGroup,
  InputGroupAddon,
} from "shards-react";
import SearchMargin from "../styled/SearchMargin";
import { useState } from "react";
import SearchQuery from "../styled/searchQuery";
import ItemsPerPage from "../styled/ItemsPerPage";

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
    <SearchMargin>
      <InputGroup>
        <Dropdown
          addonType="prepend"
          open={isDropdownOpen}
          toggle={toggleDropdown}
        >
          <DropdownToggle outline theme="secondary">
            {perPage} &#9660;
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => changeItemsPerPage(5)}>
              5 per page
            </DropdownItem>
            <DropdownItem onClick={() => changeItemsPerPage(10)}>
              10 per page
            </DropdownItem>
            <DropdownItem onClick={() => changeItemsPerPage(15)}>
              15 per page
            </DropdownItem>
            <DropdownItem onClick={() => changeItemsPerPage(18)}>
              18 per page
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <FormInput
          placeholder="Search recipes..."
          value={searchQuery}
          onKeyPress={handleKeypress}
          onChange={handleChange}
        />
        <InputGroupAddon type="append">
          <Button
            theme="secondary"
            onClick={() => requestSearchQuery(searchQuery)}
          >
            Search
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </SearchMargin>
  );
};

export default Search;
