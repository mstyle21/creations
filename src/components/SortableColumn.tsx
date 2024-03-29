import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SortableColumnProps = {
  title: string;
  value: string;
  sortOptions: {
    by: string;
    order: "asc" | "desc";
  };
  handleSort: (by: string) => void;
};

export const SortableColumn = ({ title, value, sortOptions, handleSort }: SortableColumnProps) => {
  const faIcon = sortOptions.order === "asc" ? faArrowUp : faArrowDown;

  return (
    <span className="sortable-column" onClick={() => handleSort(value)}>
      {title} {sortOptions.by === value && <FontAwesomeIcon icon={faIcon} />}
    </span>
  );
};
