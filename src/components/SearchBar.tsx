import { KeyboardEvent } from "react";

type Props = {
  searchString: string;
  setSearchString: (value: string) => void;
  handleSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const SearchBar = (props: Props) => {
  const { searchString, setSearchString, handleSearch } = props;
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-box"
        placeholder="Search Movies & TV shows"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
