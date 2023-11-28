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
  img?: string;
};

const ItemBox = ({ id, title, price, slug, type, img }: ItemBoxProps) => {
  const imgSrc = img ? `${BACKEND_URL}/${type}s/${id}/${img}` : noImage;

  return (
    <div className="item-box">
      <Link to={`/${type}/${slug}`}>
        <img src={imgSrc} className="item-image" />
      </Link>
      <div className="item-details">
        <span className="item-name">{capitalize(title)}</span>
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
        <Link to={`/${type}/${slug}`} className="btn add-to-cart">
          <span>View item</span>
        </Link>
      </div>
    </div>
  );
};

export default ItemBox;
