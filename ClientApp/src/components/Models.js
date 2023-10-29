import React, { useEffect, useState } from "react";
import { getModels } from "../fetcher";

const Models = () => {
  const [models, setModels] = useState({ errorMessage: "", data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getModels();
      setModels(responseObject);
    };
    fetchData();
  }, []);

  const rednerCars = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Model name</th>
          </tr>
          {models.data.map((model) => (
            <tr key={model.id}>
              <td>{model.id}</td>
              <td>{model.name}</td>
            </tr>
          ))}
        </thead>

        <tbody></tbody>
      </table>
    );
  };

  return (
    <div>
      {models.errorMessage && <div>Error: {models.errorMessage}</div>}
      <h1>Available cars</h1>
      {models && rednerCars()}
    </div>
  );
};

export default Models;
