import { Form } from "react-bootstrap";
import { ProductCategory } from "../types";
import { useProductContext } from "../hooks/useProductContext";
import { useEffect } from "react";
import { axiosInstance } from "../../../services/AxiosService";

const Filters = () => {
  const { state, dispatch } = useProductContext();

  useEffect(() => {
    const abortController = new AbortController();

    axiosInstance.get<ProductCategory[]>("/api/categories/all", { signal: abortController.signal }).then((response) => {
      dispatch({ type: "setCategoryList", payload: response.data });
    });

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = state.categories;

  return (
    <div className="category-filter">
      <div className="category-filter-top">Filters</div>
      <ul className="category-filter-list">
        {categories.map((category) => (
          <li key={category.id}>
            <Form.Check type="checkbox" label={category.name} id={`category${category.id}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
