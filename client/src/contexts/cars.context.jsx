import React, { createContext, useState, useCallback } from "react";
import { toast } from "react-toastify";
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

  const [formMode, setFormMode] = useState("createMode");

  const CARS_ENDPOINT = `http://localhost:6001/api/v1/cars/`;

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

    if (loading || loaded || error) {
      return;
    }

    setLoading();

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
    }
  }, [
    setError,
    setLoading,
    setCars,
    error,
    loaded,
    loading,
    cars,
    CARS_ENDPOINT,
  ]);

  // const fetchCars = useCallback(async () => {
  //   // console.log('loading', loading);
  //   // console.log('error', error);
  //   if (loading || loaded || error) {
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const response = await fetch(CARS_ENDPOINT);
  //     if (response.status !== 200) {
  //       throw response;
  //     }
  //     const data = await response.json();
  //     console.log(
  //       "🚀 ~ file: cars.context.jsx ~ line 43 ~ fetchCars ~ data",
  //       data
  //     );
  //     localStorage.setItem("cars", JSON.stringify(data));
  //     setCars(data);
  //   } catch (err) {
  //     setError(err.message || err.statusText);
  //   } finally {
  //     setLoaded(true);
  //     setLoading(false);
  //   }
  // }, [error, loaded, loading]);

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
      }
    },
    [cars, CARS_ENDPOINT]
  );

  const updateCar = useCallback(
    async (id, updates) => {
      let newCar = null;

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
      }
    },
    [cars, CARS_ENDPOINT]
  );

  // const updateCar = useCallback(
  //   async (id, formData) => {
  //     // console.log("updating", id, formData);
  //     let updatedCar = null;
  //     // Get index
  //     const index = cars.findIndex((car) => car._id === id);
  //     console.log(index);
  //     if (index === -1) throw new Error(`Car with index ${id} not found`);
  //     // Get actual car
  //     const oldCar = cars[index];
  //     console.log("oldCar", oldCar);

  //     // Send the differences, not the whole update
  //     const updates = {};

  //     for (const key of Object.keys(oldCar)) {
  //       if (key === "_id") continue;
  //       if (oldCar[key] !== formData[key]) {
  //         updates[key] = formData[key];
  //       }
  //     }

  //     try {
  //       const response = await fetch(`${CARS_ENDPOINT}${id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // 'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //         body: JSON.stringify(updates),
  //       });

  //       if (response.status !== 200) {
  //         throw response;
  //       }

  //       // Merge with formData
  //       updatedCar = {
  //         ...oldCar,
  //         ...formData, // order here is important for the override!!
  //       };
  //       console.log("updatedCar", updatedCar);
  //       // recreate the cars array
  //       const updatedCars = [
  //         ...cars.slice(0, index),
  //         updatedCar,
  //         ...cars.slice(index + 1),
  //       ];
  //       localStorage.setItem("cars", JSON.stringify(updatedCars));
  //       // addToast(`Updated ${updatedCar.name}`, {
  //       //   appearance: "success",
  //       // });
  //       setCars(updatedCars);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  //   [cars]
  // );

  const deleteCar = useCallback(
    async (id) => {
      console.log("🚀 ~ file: cars.context.jsx ~ line 155 ~ id", id);
      let deletedCar = null;
      try {
        const response = await fetch(`${CARS_ENDPOINT}${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
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
        console.log(err);
      }
    },
    [cars, CARS_ENDPOINT]
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
