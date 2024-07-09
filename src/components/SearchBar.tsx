import { KeyboardEvent, useRef } from "react";

type Props = {
  searchString: string;
  setSearchString: (value: string) => void;
  handleSearch: (e: KeyboardEvent<HTMLInputElement>, inputRef: React.RefObject<HTMLInputElement>) => void;
};

const SearchBar = (props: Props) => {
  const { searchString, setSearchString, handleSearch } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        className="search-box"
        placeholder="Search Movies & TV shows"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={(e) => handleSearch(e, inputRef)}
      />
    </div>
  );
};

export default SearchBar;
