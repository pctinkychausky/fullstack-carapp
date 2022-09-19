import React, { useContext, useEffect } from "react";
import { CarsContext } from "../../contexts/cars.context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function CarList() {
  const { cars, loading, error, fetchCars, addCar, updateCar, deleteCar } =
    useContext(CarsContext);

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}

      <div>
        <h1>Invetory List</h1>
        <table>
          <tbody>
            <tr>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {cars.map((product) => (
            <tbody key={product._id}>
              <tr>
                <td>
                  <img src={product.avatar_url} objectFit="cover" alt="" />
                </td>
                <td>{product._id.slice(0, 20)}...</td>
                <td>{product.name}</td>
                <td>${product.bhp[0]}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={deleteCar}>Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default CarList;
