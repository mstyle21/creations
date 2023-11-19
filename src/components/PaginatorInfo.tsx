type PaginatorInfoProps = {
  page: number;
  perPage: number;
  count: number;
};

const PaginatorInfo = ({ page, perPage, count }: PaginatorInfoProps) => {
  return (
    <p>
      Showing {(page - 1) * perPage + 1} to {page * perPage < count ? page * perPage : count} of {count} entries
    </p>
  );
};

export default PaginatorInfo;
