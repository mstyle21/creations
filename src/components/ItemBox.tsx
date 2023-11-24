import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noImage from "../assets/no-image.jpg";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL, CURRENCY_SIGN } from "../config";
import { Button } from "react-bootstrap";

type ItemBoxProps = {
  id: number;
  title: string;
  price: number;
  img?: string;
};

const ItemBox = ({ id, title, price, img }: ItemBoxProps) => {
  const imgSrc = img ? `${BACKEND_URL}/products/${id}/${img}` : noImage;

  return (
    <div className="item-box">
      <img src={imgSrc} className="item-image" />
      <div className="item-details">
        <span className="item-name">{title}</span>
        <div className="item-price">
          <span className="current-price">
            {price} {CURRENCY_SIGN}
          </span>
          {price < 25 && (
            <div>
              (<span className="old-price">25 {CURRENCY_SIGN}</span>)
            </div>
          )}
        </div>
        <Button className="add-to-cart">
          <FontAwesomeIcon icon={faBagShopping} size="xl" />
          <span>Add to cart</span>
        </Button>
      </div>
    </div>
  );
};

export default ItemBox;
