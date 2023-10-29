import React, { useState, useEffect } from "react";
import Car from "./Car";
import { getModels } from "../fetcher";
import { useLocation } from "react-router-dom";

const Cars = () => {
  const [models, setModels] = useState({ errorMessage: "", data: [] });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pickUpDateString = queryParams.get("pickUpDate");
  const returnDateString = queryParams.get("returnDate");
  const pickUpLocation = queryParams.get("pickUpLocation");
  const returnLocation = queryParams.get("returnLocation");

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getModels();
      setModels(responseObject);
    };
    fetchData();
  }, []);

  const rednerCars = () => {
    return (
      <div className="cars-list">
        {models.data.map((model) => (
          <Car
            key={model.id}
            id={model.id}
            name={model.name}
            price={model.pricePerDay}
            imageName={model.imageName}
            pickUpDateString={pickUpDateString}
            returnDateString={returnDateString}
            pickUpLocation={pickUpLocation}
            returnLocation={returnLocation}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {models.errorMessage && <div>Error: {models.errorMessage} </div>}
      {models && rednerCars()}
    </>
  );
};

export default Cars;
