import { createContext, useState } from "react";
import carsData from "./../../data/cars.json";

export const CarsContext = createContext({
  cars: [],
  setCars: () => {}, // Not implemented yet
  filterCity: "",
  setFilterCity: () => {},
  filteredCars: [],
  availableCities: [],
});

export function CarsContextProviderWrapper(props) {
  const [cars, setCars] = useState(carsData);

  const [filterCity, setFilterCity] = useState("");

  const filteredCars = filterCity
    ? cars.filter((car) =>
        car.City.toLowerCase().includes(filterCity.toLowerCase())
      )
    : null;

  const availableCities = Array.from(
    new Set(cars.filter((car) => car.City).map((car) => car.City))
  );

  return (
    <CarsContext.Provider
      value={{
        availableCities,
        cars,
        setCars,
        filterCity,
        setFilterCity,
        filteredCars,
      }}
    >
      {props.children}
    </CarsContext.Provider>
  );
}
