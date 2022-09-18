import React, { useEffect, useState } from "react";
import Axios from "axios";
import Footer from "../components/footer/Footer";
import Navbar from "../components/narbar/Narbar";
import removeCar from "../../../server/controllers/cars.controller";

function Admin() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:6001/api/v1/cars/").then((response) => {
      console.log(
        "🚀 ~ file: Admin.jsx ~ line 11 ~ Axios.get ~ response",
        response
      );

      setProductsList(response.data);
    });
  }, []);
  return (
    <>
      <Navbar />

      {/* {productsList.map((val, key) => {
        return (
          <div key={key}>
            <h1>{val.name}</h1>
            <h1>{val.htp}</h1>
            <img src={val.avatar_url} alt=""></img>
          </div>
        );
      })} */}

      <div>
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
            {productsList.map((product) => (
              <tbody key={product._id}>
                <tr>
                  <td>
                    <img src={product.avatar_url} objectFit="cover" alt="" />
                  </td>
                  <td>{product._id.slice(0, 5)}...</td>
                  <td>{product.name}</td>
                  <td>${product.bhp[0]}</td>
                  <td>
                    <button>Edit</button>
                    <button onClick={removeCar}>Delete</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
