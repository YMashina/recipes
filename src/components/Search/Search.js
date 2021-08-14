import { Button, FormInput, InputGroup, InputGroupAddon } from "shards-react";
import SearchMargin from "../styled/SearchMargin";
import { useState } from "react";
import SearchQuery from "../styled/searchQuery";

const Search = ({ requestSearchQuery }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      requestSearchQuery(searchQuery);
    }
  };

  return (
    <SearchMargin>
      <InputGroup>
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
