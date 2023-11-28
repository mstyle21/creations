import { Form } from "react-bootstrap";
import { ProductCategory } from "../types";
import { useProductContext } from "../hooks/useProductContext";
import { useEffect } from "react";
import { axiosInstance } from "../../../services/AxiosService";
import { useSearchParams } from "react-router-dom";

const Filters = () => {
  const { state, dispatch } = useProductContext();
  const [queryParams, setQueryParams] = useSearchParams();

  const selectedCategories = queryParams.get("categories")?.split(",") ?? [];

  useEffect(() => {
    const abortController = new AbortController();

    axiosInstance
      .get<ProductCategory[]>("/api/categories/all", { signal: abortController.signal })
      .then((response) => {
        dispatch({ type: "setCategoryList", payload: response.data });
      })
      .catch(() => {
        //hide category filter
      });

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = state.categories;

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
            <Form.Check label="In stock" type="checkbox" />
          </li>
          <li>
            <Form.Check label="Out of stock" type="checkbox" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
