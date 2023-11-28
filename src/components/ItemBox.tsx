import noImage from "../assets/no-image.jpg";
import { BACKEND_URL, CURRENCY_SIGN } from "../config";
import { Link } from "react-router-dom";
import { capitalize } from "../utils";

type ItemBoxProps = {
  id: number;
  title: string;
  price: number;
  slug: string;
  type: "product" | "package";
  stock?: number;
  img?: string;
};

const ItemBox = ({ id, title, price, slug, type, stock, img }: ItemBoxProps) => {
  const imgSrc = img ? `${BACKEND_URL}/${type}s/${id}/${img}` : noImage;

  return (
    <div className="item-box">
      <Link to={`/${type}/${slug}`}>
        <img src={imgSrc} className="item-image" />
      </Link>
      <div className="item-details">
        <span className="item-name">{capitalize(title)}</span>
        <div className="item-price">
          {stock !== undefined && (
            <span style={{ color: stock === 0 ? "red" : "green", display: "inline" }}>
              {stock === 0 ? "Out of stock" : "In stock"}
            </span>
          )}
          <div>
            <span className="current-price">
              {price} {CURRENCY_SIGN}
            </span>
            <div>{price < 20 ? <span className="old-price">20 {CURRENCY_SIGN}</span> : <span>&nbsp;</span>}</div>
          </div>
        </div>
        <Link to={`/${type}/${slug}`} className="btn add-to-cart">
          <span>View item</span>
        </Link>
      </div>
    </div>
  );
};

export default ItemBox;
