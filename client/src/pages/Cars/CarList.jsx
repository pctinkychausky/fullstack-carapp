import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CarsContext } from "../../contexts/cars.context";
import "./CarList.css";
import Loading from "../../components/loading/Loading";

function CarList() {
  const navigate = useNavigate();
  const { cars, loading, loaded, error, fetchCars, deleteCar, EditHandler } =
    useContext(CarsContext);

  useEffect(() => {
    if (!loaded) {
      fetchCars();
    }
  }, []);

  return (
    <>
      {!loaded && <Loading />}

      <div>
        <table>
          {cars.map((product) => (
            <tbody key={product._id} className="product-container">
              <tr className="product-details">
                <td>
                  <img src={product.ImageUrl} objectFit="cover" alt="" />
                </td>
                <td>{product._id}</td>
                <td>{product.Make}</td>
                <td>{product.Model}</td>
                <td>{product.City}</td>
                <td>{product.Year}</td>
                <td>${product.Price}/day</td>
                <td>
                  <button
                    onClick={() => {
                      navigate(`/admin/update/${product._id}`);
                    }}

                    // onClick={() => EditHandler(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteCar(product._id);
                    }}
                  >
                    Delete
                  </button>
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
