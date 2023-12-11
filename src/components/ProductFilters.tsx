import { Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useAllCategories } from "../api/getAllCategories";

const stockOptions = [
  {
    label: "In stock",
    value: "yes",
  },
  {
    label: "Out of stock",
    value: "no",
  },
];

const ProductFilters = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const selectedCategories = queryParams.get("categories")?.split(",") ?? [];
  const selectedAvailability = queryParams.get("available") ?? "";
  const { categoryList: categories } = useAllCategories({});

  const handleCategoryChange = (categoryId: string) => {
    const categoryFilter = queryParams.get("categories")?.split(",") ?? [];

    if (categoryFilter?.includes(categoryId)) {
      const newCategoryFilter = categoryFilter.filter((id) => id !== categoryId);

      if (newCategoryFilter.length > 0) {
        queryParams.set("categories", newCategoryFilter.join(","));
      } else {
        queryParams.delete("categories");
      }
    } else {
      categoryFilter.push(categoryId);
      queryParams.set("categories", categoryFilter.join(","));
    }

    queryParams.set("page", "1");
    setQueryParams(queryParams);
  };

  const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    queryParams.set("available", event.target.checked ? event.target.value : "");
    queryParams.set("page", "1");
    setQueryParams(queryParams);
  };

  return (
    <div className="product-filters">
      <div className="product-filters-top">Filters</div>
      {categories.length > 0 && (
        <div className="filter category-filter">
          <h6 className="ps-3">Categories</h6>
          <ul className="category-filter-list">
            {categories.map((category) => (
              <li key={category.id}>
                <Form.Check
                  type="checkbox"
                  label={category.name}
                  id={`category${category.id}`}
                  checked={selectedCategories.includes(category.id.toString())}
                  value={category.id}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="filter stock-filter">
        <h6 className="ps-3">Availability</h6>
        <ul className="stock-filter-list">
          {stockOptions.map((stock, index) => (
            <li key={index}>
              <Form.Check
                label={stock.label}
                type="checkbox"
                id={stock.value}
                checked={selectedAvailability === stock.value}
                value={stock.value}
                onChange={(e) => handleAvailabilityChange(e)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductFilters;
