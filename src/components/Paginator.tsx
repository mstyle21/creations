import { Pagination } from "react-bootstrap";

type PaginatorProps = {
  currentPage: number;
  pages: number;
  handleClick: (nr: number) => void;
};

const Paginator = ({ currentPage, pages, handleClick }: PaginatorProps) => {
  const paginationItems = [];
  const paginationRange = 2;
  if (pages > 1) {
    for (let nr = 2; nr < pages; nr++) {
      if (nr >= currentPage - paginationRange && nr <= currentPage + paginationRange) {
        paginationItems.push(
          <Pagination.Item key={nr} active={nr === currentPage} onClick={() => handleClick(nr)}>
            {nr}
          </Pagination.Item>
        );
      }
    }
  }

  return (
    <Pagination style={{ gap: "10px" }}>
      {currentPage > 1 && (
        <>
          <Pagination.Prev onClick={() => handleClick(currentPage - 1)} />
        </>
      )}
      <Pagination.Item active={currentPage === 1} onClick={() => handleClick(1)}>
        1
      </Pagination.Item>
      {currentPage > 2 + paginationRange && <Pagination.Ellipsis disabled />}
      {paginationItems}
      {currentPage < pages - paginationRange - 1 && <Pagination.Ellipsis disabled />}
      {pages > 1 && (
        <Pagination.Item active={currentPage === pages} onClick={() => handleClick(pages)}>
          {pages}
        </Pagination.Item>
      )}
      {currentPage < pages && (
        <>
          <Pagination.Next onClick={() => handleClick(currentPage + 1)} />
        </>
      )}
    </Pagination>
  );
};

export default Paginator;
