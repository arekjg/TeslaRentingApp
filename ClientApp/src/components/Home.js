import React, { useEffect, useState } from "react";
import { getLocations } from "../fetcher";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const today = new Date().toISOString().substring(0, 10);
  const [locations, setLocations] = useState({ errorMessage: "", data: [] });
  const [pickUpDate, setPickUpDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [minReturnDate, setMinReturnDate] = useState(today);
  const [form, setForm] = useState({
    pickUpLocation: null,
    returnLocation: null,
    pickUpDate: null,
    returnDate: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getLocations();
      setLocations(responseObject);
    };
    fetchData();
  }, []);

  const handlePickUpDate = (e) => {
    setPickUpDate(e.target.value);
    setMinReturnDate(e.target.value);
    setForm({ ...form, pickUpDate: e.target.value });
  };

  const handleReturnDate = (e) => {
    setReturnDate(e.target.value);
    setForm({ ...form, returnDate: e.target.value });
  };

  const handlePickUpLocation = (e) => {
    setForm({ ...form, pickUpLocation: e.target.value });
  };

  const handleReturnLocation = (e) => {
    setForm({ ...form, returnLocation: e.target.value });
  };

  const handleSearch = () => {
    if (form.pickUpLocation === "" || form.returnLocation === "") {
      // TODO - validation
    }

    navigate(
      `/cars?pickUpLocation=${form.pickUpLocation}&returnLocation=${form.returnLocation}&pickUpDate=${form.pickUpDate}&returnDate=${form.returnDate}`
    );
  };

  const rednerLocationsSelect = () => {
    return (
      <div>
        <select
          className="location-picker"
          name="pick-up-location"
          onChange={handlePickUpLocation}
          required
        >
          <option value="">Choose a location</option>
          {locations.data.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <span className="error-message">You must choose a location</span>
        <select
          className="location-picker"
          name="return-location"
          onChange={handleReturnLocation}
          required
        >
          <option value="">Choose a location</option>
          {locations.data.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <span className="error-message">You must choose a location</span>
      </div>
    );
  };

  return (
    <form className="search-form-container">
      <div className="search-header">
        <label>Pick up & Return location</label>
      </div>

      {locations && rednerLocationsSelect()}

      <div className="search-header">
        <label>Pick up & Return date</label>
      </div>
      <div>
        <input
          type="date"
          name="pick-up-date"
          placeholder="Choose a date"
          defaultValue={pickUpDate}
          onChange={handlePickUpDate}
          min={today}
          required
        />
        <input
          type="date"
          name="return-date"
          placeholder="Choose a date"
          defaultValue={returnDate}
          onChange={handleReturnDate}
          min={minReturnDate}
          required
        />
      </div>
      <div className="search-btn">
        <button onClick={handleSearch}>Search</button>
      </div>
    </form>
  );
};

export default Home;
