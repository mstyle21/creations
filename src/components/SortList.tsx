import React from "react";
import { Form } from "react-bootstrap";

type SortListProps = {
  sortByList: { [key: string]: string };
  onSortByChange: (sortBy: string) => void;
  defaultValue?: string;
  className?: string;
  style?: React.CSSProperties;
};

const SortList = ({ defaultValue, sortByList, onSortByChange, className, style }: SortListProps) => {
  return (
    <Form.Select
      defaultValue={defaultValue}
      onChange={(e) => onSortByChange(e.target.value)}
      className={className}
      style={style}
    >
      {Object.entries(sortByList).map((item, index) => (
        <option key={index} value={item[0]}>
          {item[1]}
        </option>
      ))}
    </Form.Select>
  );
};

export default SortList;
