import React, { useEffect, useState } from "react";
import { getLocations } from "../fetcher";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const today = new Date().toISOString().substring(0, 10);
  const [locations, setLocations] = useState({ errorMessage: "", data: [] });
  const [minReturnDate, setMinReturnDate] = useState(today);
  const [form, setForm] = useState({
    pickUpLocation: null,
    returnLocation: null,
    pickUpDate: today,
    returnDate: today,
  });

  const [formErrors, setFormErrors] = useState({
    pickUpLocation: "",
    returnLocation: "",
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
    setMinReturnDate(e.target.value);
    setForm({ ...form, pickUpDate: e.target.value });
  };

  const handleReturnDate = (e) => {
    setForm({ ...form, returnDate: e.target.value });
  };

  const handlePickUpLocation = (e) => {
    setForm({ ...form, pickUpLocation: e.target.value });
    setFormErrors({ ...formErrors, pickUpLocation: "" });
  };

  const handleReturnLocation = (e) => {
    setForm({ ...form, returnLocation: e.target.value });
    setFormErrors({ ...formErrors, returnLocation: "" });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    let isValid = true;
    const updatedFormErrors = { ...formErrors };

    if (form.pickUpLocation === null || form.pickUpLocation === "") {
      updatedFormErrors.pickUpLocation = "You must choose a location";
      isValid = false;
    }
    if (form.returnLocation === null || form.returnLocation === "") {
      updatedFormErrors.returnLocation = "You must choose a location";
      isValid = false;
    }

    setFormErrors(updatedFormErrors);

    if (isValid) {
      navigate(
        `/cars?pickUpLocation=${form.pickUpLocation}&returnLocation=${form.returnLocation}&pickUpDate=${form.pickUpDate}&returnDate=${form.returnDate}`
      );
    }
  };

  const rednerLocationsSelect = () => {
    return (
      <div>
        <select
          className={`location-picker ${formErrors.pickUpLocation && "error"}`}
          name="pick-up-location"
          onChange={handlePickUpLocation}
        >
          <option value="">Choose a location</option>
          {locations.data.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        {formErrors.pickUpLocation && (
          <span className="error-message">{formErrors.pickUpLocation}</span>
        )}

        <select
          className={`location-picker ${formErrors.pickUpLocation && "error"}`}
          name="return-location"
          onChange={handleReturnLocation}
        >
          <option value="">Choose a location</option>
          {locations.data.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        {formErrors.returnLocation && (
          <span className="error-message">{formErrors.returnLocation}</span>
        )}
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
          defaultValue={form.pickUpDate}
          onChange={handlePickUpDate}
          min={today}
        />
        <input
          type="date"
          name="return-date"
          placeholder="Choose a date"
          defaultValue={form.returnDate}
          onChange={handleReturnDate}
          min={minReturnDate}
        />
      </div>
      <div className="search-btn">
        <button onClick={handleSearch}>Search</button>
      </div>
    </form>
  );
};

export default Home;
