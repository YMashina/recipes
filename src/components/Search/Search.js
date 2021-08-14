import { Button, FormInput, InputGroup, InputGroupAddon } from "shards-react";
import SearchMargin from "../styled/SearchMargin";
import { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <SearchMargin>
      <InputGroup>
        <FormInput
          placeholder="Input recipe"
          value={searchQuery}
          onChange={handleChange}
        />
        <InputGroupAddon type="append">
          <Button theme="secondary">Search</Button>
        </InputGroupAddon>
      </InputGroup>
    </SearchMargin>
  );
};

export default Search;
