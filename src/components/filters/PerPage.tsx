import { Form } from "react-bootstrap";

type PerPageFilterProps = {
  perPage: number;
  onChange: (page: number) => void;
};

const perPageOptions = [10, 20, 50, 100];

const PerPageFilter = ({ perPage, onChange }: PerPageFilterProps) => {
  return (
    <Form.Select
      onChange={(e) => {
        onChange(parseInt(e.target.value));
      }}
      value={perPage}
      className="admin-per-page"
    >
      {perPageOptions.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </Form.Select>
  );
};

export default PerPageFilter;
