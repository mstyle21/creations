import { debounce } from "lodash";
import { Form } from "react-bootstrap";

type SearchFilterProps = {
  onChange: (text: string) => void;
  delay?: number;
};

const SearchFilter = ({ onChange, delay = 500 }: SearchFilterProps) => {
  const debouncedSearch = debounce((value) => onChange(value), delay);

  return (
    <div>
      <Form.Control
        className="admin-search"
        type="text"
        placeholder="Search..."
        onChange={(e) => debouncedSearch(e.target.value)}
      ></Form.Control>
    </div>
  );
};

export default SearchFilter;
