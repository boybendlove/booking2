import "./searchItem.css";
import { useNavigate } from 'react-router-dom';

const SearchItem = ({
  title, address, availableRooms, cheapestPrice, city,desc ,distanc, name, photos, rating, type, featured,id
}) => {
  const navigate = useNavigate();

  const handleSeeAvailability = () => {
    // Điều hướng đến trang khách sạn cụ thể dựa trên ID của khách sạn
    navigate(`/hotels/${id}`);
  };
  return (
    <div className="searchItem">
      <img
        src={photos}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{title}</h1>
        <span className="siDistance">{distanc} from center</span>
        <span className="siTaxiOp">{featured ? 'Free Taxi' : 'Free Bus'}</span>
        <span className="siSubtitle">
          {desc}
        </span>
        <span className="siFeatures">
          {type}
        </span>
        {/* If can cancel */}
        {featured ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (<div></div>)}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{rating > 8 ? 'Excellent' : rating > 7 ? 'Good' : rating > 4 ? 'Medium' : ''}</span>
          <button>{rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={handleSeeAvailability} >See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
