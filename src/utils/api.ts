
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "2dca580c2a14b55200e784d157207b4d";

export const getDataFromApi = <T>(endpoint: string, params: string = ""): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}${params}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            reject(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          reject(error);
        });
    });
  };