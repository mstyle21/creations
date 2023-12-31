import { Link } from "react-router-dom";
import { BACKEND_URL, THUMBNAIL_PREFIX } from "../config";
import { DEFAULT_IMAGE, capitalize } from "../utils";
import { routesConfig } from "../routes";

type PackageItemBoxProps = {
  id: number;
  title: string;
  quantity: number;
  slug: string;
  img?: string;
};

const PackageItemBox = ({ id, title, quantity, slug, img }: PackageItemBoxProps) => {
  const imgSrc = img ? `${BACKEND_URL}/products/${id}/${THUMBNAIL_PREFIX}${img}` : DEFAULT_IMAGE;
  const link = `${routesConfig.product}/${slug}`;

  return (
    <div className="item-box">
      <Link to={link}>
        <img src={imgSrc} className="item-image" />
      </Link>
      <div className="item-details">
        <span className="item-name">
          {quantity} x {capitalize(title)}
        </span>

        <Link to={link} className="btn add-to-cart">
          <span>Vezi produs</span>
        </Link>
      </div>
    </div>
  );
};

export default PackageItemBox;
