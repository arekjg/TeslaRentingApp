export const baseURL = "https://localhost:7292/";

const fetcherGet = async (url) => {
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

const fetcherPost = async (url, data) => {
  let responseObject = { errorMessage: "", data: {} };
  try {
    const response = await fetch(baseURL + url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
  return fetcherGet("api/cars");
};

export const getLocations = () => {
  return fetcherGet("api/locations");
};

export const getLocation = (id) => {
  return fetcherGet(`api/locations/${id}`);
};

export const getModels = () => {
  return fetcherGet("api/models");
};

export const getModel = (id) => {
  return fetcherGet(`api/models/${id}`);
};

export const getReservations = () => {
  return fetcherGet("api/reservations");
};

export const getReservation = (id) => {
  return fetcherGet(`api/reservations/${id}`);
};

export const getUser = (id) => {
  return fetcherGet(`api/users/${id}`);
};

export const postReservation = (data) => {
  return fetcherPost("api/reservations", data);
};

export const postUser = (data) => {
  return fetcherPost("api/users", data);
};
