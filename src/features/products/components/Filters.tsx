import { Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useAllCategories } from "../../../api/getAllCategories";

const Filters = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const selectedCategories = queryParams.get("categories")?.split(",") ?? [];
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
          <li>
            <Form.Check label="In stock" type="checkbox" id="inStock" />
          </li>
          <li>
            <Form.Check label="Out of stock" type="checkbox" id="outOfStock" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
