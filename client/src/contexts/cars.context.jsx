import React, { createContext, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
// import { useToasts } from "react-toast-notifications";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex

export const CarsContext = createContext({
  fetchCars: () => [],
  addCar: () => {},
  updateCar: () => {},
  deleteCar: () => {},
  loaded: false,
  loading: false,
  error: null,
  cars: [],
  filterCity: "",
  setFilterCity: () => {},
  filteredCars: [],
  availableCities: [],
  selectedDate: [],
  addDate: () => {},
});

export const CarsProvider = (props) => {
  const [cars, setCars] = useState(() => {
    return JSON.parse(localStorage.getItem("cars")) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [filterCity, setFilterCity] = useState("");
  const [selectedDate, setSelectedDate] = useState([]);

  //auth0
  const { getAccessTokenSilently } = useAuth0();

  const CARS_ENDPOINT = `${window.location.origin}/api/v1/cars/`;

  console.log(
    "🚀 ~ file: cars.context.jsx:39 ~ CarsProvider ~ CARS_ENDPOINT:",
    CARS_ENDPOINT
  );

  const filteredCars = filterCity
    ? cars.filter((car) =>
        car.City.toLowerCase().includes(filterCity.toLowerCase())
      )
    : null;

  const availableCities = Array.from(
    new Set(cars.filter((car) => car.City).map((car) => car.City))
  );

  const fetchCars = useCallback(async () => {
    // console.log('loading', loading);
    // console.log('error', error);

    console.log("hello");
    if (loading || loaded || error) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(CARS_ENDPOINT);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setCars(data);
      console.log("products from context", cars);
    } catch (err) {
      console.log("err", err);
      setError(err);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [
    CARS_ENDPOINT,
    cars,
    setError,
    setLoading,
    setCars,
    error,
    loaded,
    loading,
    getAccessTokenSilently,
  ]);

  const addDate = useCallback(
    async (date) => {
      console.log(date);
      setSelectedDate(date);
    },
    [filterCity]
  );

  const addCar = useCallback(
    async (formData) => {
      console.log("about to add", formData);
      setLoading(true);
      try {
        const response = await fetch(CARS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedCar = await response.json();
        console.log("got data", savedCar);
        const newCars = [...cars, savedCar];
        localStorage.setItem("cars", JSON.stringify(newCars));
        setCars(newCars);
        toast.success("Adding successfully!", {
          position: "top-right",
          autoClose: 400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // addToast(`Saved ${savedCar.name}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        console.log(err);
        toast.warn("Adding failed!", {
          position: "top-right",
          autoClose: 300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // addToast(`Error ${err.message || err.statusText}`, {
        //   appearance: "error",
        // });
      } finally {
        setLoaded(true);
        setLoading(false);
      }
    },
    [
      cars,
      CARS_ENDPOINT,
      setLoading,
      error,
      loaded,
      loading,
      getAccessTokenSilently,
    ]
  );

  const updateCar = useCallback(
    async (id, updates) => {
      let newCar = null;
      setLoading(true);

      try {
        const response = await fetch(`${CARS_ENDPOINT}${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(updates),
        });
        if (!response.ok) {
          throw response;
        }
        // Get index
        const index = cars.findIndex((product) => product._id === id);

        // Get actual product
        const oldCar = cars[index];
        console.log(
          "🚀 ~ file: products.context.js ~ line 95 ~ updateCar ~ oldCar",
          oldCar
        );

        // Merge with updates
        newCar = {
          // legit use of 'var', so can be seen in catch block
          ...oldCar,
          ...updates, // order here is important for the override!!
        };
        console.log(
          "🚀 ~ file: products.context.js ~ line 99 ~ updateCar ~ newCar",
          newCar
        );
        // recreate the products array
        const updatedCars = [
          ...cars.slice(0, index),
          newCar,
          ...cars.slice(index + 1),
        ];
        console.log(
          "🚀 ~ file: products.context.js ~ line 120 ~ updatedCars",
          updatedCars
        );
        setCars(updatedCars);
        toast.success("Update successfully!", {
          position: "top-right",
          autoClose: 300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (err) {
        console.log(err);
        setError(err);
        toast.warn("Update failed!", {
          position: "top-right",
          autoClose: 300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setLoaded(true);
        setLoading(false);
      }
    },
    [
      CARS_ENDPOINT,
      cars,
      setError,
      setLoading,
      setCars,
      loading,
      loaded,
      error,
      getAccessTokenSilently,
    ]
  );

  const deleteCar = useCallback(
    async (id) => {
      console.log("🚀 ~ file: cars.context.jsx ~ line 155 ~ id", id);
      let deletedCar = null;
      setLoading(true);
      try {
        const token = await getAccessTokenSilently({
          audience: "http://fullstack-carapp/api",
          scope: "delete:products",
        });
        console.log(
          "🚀🚀🚀 ~ file: cars.context.jsx ~ line 317 ~ token",
          token
        );

        const response = await fetch(`${CARS_ENDPOINT}${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = cars.findIndex((car) => car._id === id);
        deletedCar = cars[index];
        // recreate the cars array without that car
        const updatedCars = [...cars.slice(0, index), ...cars.slice(index + 1)];
        localStorage.setItem("cars", JSON.stringify(updatedCars));
        setCars(updatedCars);
        console.log(`Deleted ${deletedCar.name}`);
        // addToast(`Deleted ${deletedCar.name}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        console.log("err", err);
        toast.success(
          `${err.statusText}! Only senior admin is allowed to delete products`,
          {
            position: "top-right",
            autoClose: 1800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      } finally {
        setLoaded(true);
        setLoading(false);
      }
    },
    [
      cars,
      CARS_ENDPOINT,
      setLoading,
      error,
      loaded,
      loading,
      getAccessTokenSilently,
    ]
  );

  return (
    <CarsContext.Provider
      value={{
        cars,
        loading,
        error,
        loaded,
        fetchCars,
        addCar,
        updateCar,
        deleteCar,
        availableCities,
        filterCity,
        setFilterCity,
        filteredCars,
        addDate,
        selectedDate,
      }}
    >
      {props.children}
    </CarsContext.Provider>
  );
};
