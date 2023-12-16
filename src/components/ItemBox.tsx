import { BACKEND_URL, CURRENCY_SIGN, THUMBNAIL_PREFIX } from "../config";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE, capitalize } from "../utils";

type ItemBoxProps = {
  id: number;
  title: string;
  price: number;
  slug: string;
  type: "product" | "package";
  oldPrice?: number;
  stock?: number;
  img?: string;
};

const ItemBox = ({ id, title, price, slug, type, oldPrice, stock, img }: ItemBoxProps) => {
  const imgSrc = img ? `${BACKEND_URL}/${type}s/${id}/${THUMBNAIL_PREFIX}${img}` : DEFAULT_IMAGE;
  const link = `/${type === "product" ? "figurine" : "figurine-set"}/${slug}`;

  return (
    <div className="item-box">
      <Link to={link}>
        <img src={imgSrc} className="item-image" />
      </Link>
      <div className="item-details">
        <span className="item-name">{capitalize(title)}</span>
        <div className="item-price">
          {stock !== undefined && (
            <span style={{ color: stock === 0 ? "red" : "green", display: "inline" }}>
              {stock === 0 ? "Stoc epuizat" : "In stoc"}
            </span>
          )}
          <div>
            <span className="current-price">
              {price / 100} {CURRENCY_SIGN}
            </span>
            <div>
              {oldPrice && price < oldPrice ? (
                <span className="old-price">
                  {oldPrice / 100} {CURRENCY_SIGN}
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          </div>
        </div>
        <Link to={link} className="btn add-to-cart">
          <span>Vezi produs</span>
        </Link>
      </div>
    </div>
  );
};

export default ItemBox;
