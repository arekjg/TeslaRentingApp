const baseURL = "https://localhost:7292/";

const fetcher = async (url) => {
  let responseObject = { errorMessage: "", data: [] };
  try {
    const response = await fetch(baseURL + url);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const responseData = await response.json();
    responseObject.errorMessage = "";
    responseObject.data = responseData;
  } catch (error) {
    responseObject.errorMessage = error.message;
  }
  return responseObject;
};

export const getCars = () => {
  return fetcher("api/cars");
};

export const getLocations = () => {
  return fetcher("api/locations");
};

export const getModels = () => {
  return fetcher("api/models");
};

export const getReservations = () => {
  return fetcher("api/reservations");
};
