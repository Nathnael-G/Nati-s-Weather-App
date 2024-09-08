import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function SearchSection({
  location,
  setLocation,
  handleSearch,
  handleCurrentLocation,
}) 
{
    return (
    <section className="relative max-w-[400px] w-full bg-transparent border-2 border-white/50 rounded-2xl backdrop-blur-[55px] p-8">
        <div className="relative flex items-center justify-between mt-3 mb-8">
            <input
            type="text"
            name="location"
            id="search-input"
            className="w-full px-5 py-2 text-lg text-white bg-transparent border-b-2 border-white outline-none"
            placeholder="Weather in ..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            <button
            type="button"
            className="px-4 py-2 ml-1 text-black bg-white border-2 border-white rounded-md hover:bg-transparent hover:text-white"
            onClick={handleSearch}>
            Search
            </button>
        </div>
            <button
            className="w-full px-4 py-2 font-medium bg-white border-2 rounded-full hover:bg-transparent hover:text-white"
            onClick={handleCurrentLocation}>
            {" "}
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            Current Location
        </button>
    </section>
    );
}
SearchSection.propTypes = {
    location: PropTypes.string.isRequired,
    setLocation: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    handleCurrentLocation: PropTypes.func.isRequired,
};
export default SearchSection;
