import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadingSpinner = ({ size = "3x" }: { size?: SizeProp }) => {
  return (
    <div className="loading-container">
      <div
        className="loading-overlay"
        style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}
      ></div>
      <FontAwesomeIcon className="loading-spinner" icon={faSpinner} pulse size={size} />
    </div>
  );
};

export default LoadingSpinner;
