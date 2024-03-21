import { Accordion, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useAllCategories } from "../api/getAllCategories";
import useWindowDimensions from "../hooks/useWindowDimensions";

export const STRING_SEPARATOR = ",";
export const CATEGORIES_KEY = "categories";
export const TYPE_KEY = "type";
export const AVAILABILITY_KEY = "available";

const stockOptions = [
  {
    label: "In stoc",
    value: "yes",
  },
  {
    label: "Stoc epuizat",
    value: "no",
  },
];

const typeOptions = [
  {
    label: "Bucata",
    value: "product",
  },
  {
    label: "Set",
    value: "package",
  },
];

const ProductFilters = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const selectedCategories = queryParams.get(CATEGORIES_KEY)?.split(",") ?? [];
  const selectedType = queryParams.get(TYPE_KEY) ?? "";
  const selectedAvailability = queryParams.get(AVAILABILITY_KEY) ?? "";
  const { categoryList: categories } = useAllCategories({});
  const { width } = useWindowDimensions();

  const handleCategoryChange = (categoryId: string) => {
    const categoryFilter = queryParams.get(CATEGORIES_KEY)?.split(STRING_SEPARATOR) ?? [];

    if (categoryFilter?.includes(categoryId)) {
      const newCategoryFilter = categoryFilter.filter((id) => id !== categoryId);

      if (newCategoryFilter.length > 0) {
        queryParams.set(CATEGORIES_KEY, newCategoryFilter.join(STRING_SEPARATOR));
      } else {
        queryParams.delete(CATEGORIES_KEY);
      }
    } else {
      categoryFilter.push(categoryId);
      queryParams.set(CATEGORIES_KEY, categoryFilter.join(STRING_SEPARATOR));
    }

    queryParams.set("page", "1");
    setQueryParams(queryParams);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      queryParams.set(TYPE_KEY, event.target.value);
    } else {
      queryParams.delete(TYPE_KEY);
    }

    queryParams.set("page", "1");
    setQueryParams(queryParams);
  };

  const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      queryParams.set(AVAILABILITY_KEY, event.target.value);
    } else {
      queryParams.delete(AVAILABILITY_KEY);
    }

    queryParams.set("page", "1");
    setQueryParams(queryParams);
  };

  return (
    <Accordion defaultActiveKey={width > 991 ? "0" : undefined}>
      <Accordion.Item eventKey="0" className="product-filters">
        <Accordion.Header className="product-filters-top" as="div">
          Filtre
        </Accordion.Header>
        <Accordion.Body>
          {categories.length > 0 && (
            <div className="filter category-filter">
              <h6 className="ps-3">Categorii</h6>
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
          <div className="filter type-filter">
            <h6 className="ps-3">Tip</h6>
            <ul className="type-filter-list">
              {typeOptions.map((type, index) => (
                <li key={index}>
                  <Form.Check
                    label={type.label}
                    type="checkbox"
                    id={type.value}
                    checked={selectedType === type.value}
                    value={type.value}
                    onChange={(e) => handleTypeChange(e)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="filter stock-filter">
            <h6 className="ps-3">Disponibilitate</h6>
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
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ProductFilters;
