import React from "react";
import { Form } from "react-bootstrap";

type PerPageFilterProps = {
  perPageOptions: number[];
  onChange: (page: number) => void;
  style?: React.CSSProperties;
  className?: string;
};

const PerPageFilter = ({ perPageOptions, onChange, style, className }: PerPageFilterProps) => {
  return (
    <Form.Select
      onChange={(e) => {
        onChange(parseInt(e.target.value));
      }}
      className={`per-page-selector ${className ?? ""}`}
      style={style}
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
