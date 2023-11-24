import React from "react";
import { Form } from "react-bootstrap";

type SortListProps = {
  sortByList: { [key: string]: string };
  onSortByChange: (sortBy: string) => void;
  className?: string;
  style?: React.CSSProperties;
};

const SortList = ({ sortByList, onSortByChange, className, style }: SortListProps) => {
  return (
    <Form.Select onChange={(e) => onSortByChange(e.target.value)} className={className} style={style}>
      {Object.entries(sortByList).map((item, index) => (
        <option key={index} value={item[0]}>
          {item[1]}
        </option>
      ))}
    </Form.Select>
  );
};

export default SortList;
