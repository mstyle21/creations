import { useAllProducts } from "../../../api/getAllProducts";
import { PackageItem, PackageProductReducerAction } from "../../../types";
import { FloatingLabel, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ReactSelect from "react-select";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { DEFAULT_IMAGE } from "../../../utils";
import { BACKEND_URL, THUMBNAIL_PREFIX } from "../../../config";

type PackageItemsProps = {
  packageItems: PackageItem[];
  dispatchItems: React.Dispatch<PackageProductReducerAction>;
};

const PackageItems = ({ packageItems, dispatchItems }: PackageItemsProps) => {
  const [itemId, setItemId] = useState(0);
  const [quantity, setQuantity] = useState<number | "">("");
  const [validated, setValidated] = useState(false);
  const { productList, error, isLoading } = useAllProducts({});

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error.message}</div>;

  const productOptions = productList.reduce((list: { value: number; label: string }[], product) => {
    if (!packageItems.find((item) => item.productId === product.id)) {
      list.push({ value: product.id, label: product.name });
    }

    return list;
  }, []);
  const selectedItem = productList.find((product) => product.id === itemId);

  const handleItemSave = () => {
    if (itemId === 0 || quantity === "" || quantity < 1) {
      setValidated(true);
      return false;
    }

    if (selectedItem) {
      console.log(selectedItem);
      dispatchItems({
        type: "add",
        payload: {
          quantity: quantity,
          productId: selectedItem.id,
          name: selectedItem.name,
          image: selectedItem.images[0]?.filename ?? null,
        },
      });
      setItemId(0);
      setQuantity("");
      setValidated(false);
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <h2 className="text-center">Items</h2>
      <div className="manage-package-item" style={{ gridTemplateColumns: "2fr 1fr 50px" }}>
        <ReactSelect
          isSearchable
          options={productOptions}
          placeholder="Product"
          value={selectedItem ? { value: itemId, label: selectedItem.name } : null}
          onChange={(e) => setItemId(e?.value ?? 0)}
          styles={{
            container: (baseStyles) => ({
              ...baseStyles,
              border: validated && itemId === 0 ? "1px solid red" : "initial",
            }),
            control: (baseStyles) => ({
              ...baseStyles,
              height: "58px",
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              display: "none",
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              zIndex: 5,
            }),
          }}
        />
        <FloatingLabel label="Quantity" style={{ border: validated && quantity === 0 ? "1px solid red" : "" }}>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value !== "" ? parseInt(e.target.value) : "")}
          />
        </FloatingLabel>
        <FontAwesomeIcon onClick={handleItemSave} className="save-package-item" icon={faCirclePlus} size="2x" />
      </div>
      <div>
        {packageItems.map((item) => (
          <div
            key={item.productId}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 100px 100px",
              padding: "10px 0",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <img
              style={{ height: "50px" }}
              src={
                item.image
                  ? `${BACKEND_URL}/products/${item.productId}/${THUMBNAIL_PREFIX}${item.image}`
                  : DEFAULT_IMAGE
              }
            />
            <span>{item.name}</span>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                if (!isNaN(newQuantity) && newQuantity > 0) {
                  dispatchItems({ type: "edit", payload: { ...item, quantity: newQuantity } });
                }
              }}
              style={{ width: "80px", border: "none", borderBottom: "1px solid black", textAlign: "center" }}
            />
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => dispatchItems({ type: "delete", payload: item })}
              color="red"
              fontSize="20px"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageItems;
