import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CarsContext } from "../../contexts/cars.context";
import { useParams } from "react-router-dom";
import "./CarForm.css";

function CarForm({ initialValues }) {
  const {
    Make,
    Model,
    FullName,
    City,
    Year,
    ImageUrl,
    Gearbox,
    Seats,
    Doors,
    Price,
    cars,
    loading,
    error,
    fetchCars,
    addCar,
    updateCar,
    deleteCar,
    // formMode,
    // setFormMode,
  } = useContext(CarsContext);

  const [state, setState] = useState("");

  let { id } = useParams();
  const [populated, setPopulated] = useState(false);
  const [image, setImage] = useState("");

  const fileSelectedHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (initialValues && !populated) {
    reset(initialValues);
    setPopulated(true);
  }

  const onSubmit = (formValues) => {
    if (!populated) {
      //   const updates = {};
      //   for (const key in initialValues) {
      //     if (initialValues.hasOwnProperty(key)) {
      //       if (initialValues[key] !== formValues[key] && key[0] !== "_") {
      //         updates[key] = formValues[key];
      //       }
      //     }
      //   }
      updateCar(id, formValues);
      console.log("updates", formValues);
    } else {
      addCar(formValues);
    }
  };

  console.log(errors);

  return (
    <Card
      sx={{ minWidth: 275, maxHeight: 900, boxShadow: 3 }}
      className="card-container"
    >
      <CardContent>
        <div>
          <h3 className="form-title">Add Car</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <TextField
              required
              id="filled-password-input"
              label="Make"
              variant="filled"
              type="text"
              placeholder="Make"
              value={Make}
              {...register("Make", { required: true, maxLength: 80 })}
            />
            <TextField
              required
              id="filled-password-input"
              label="Model"
              variant="filled"
              type="text"
              value={Model}
              placeholder="Model"
              {...register("Model", { required: true, maxLength: 100 })}
            />
            <TextField
              required
              id="filled-password-input"
              label="FullName"
              variant="filled"
              type="text"
              value={FullName}
              placeholder="FullName"
              {...register("FullName", {})}
            />
            <TextField
              className=""
              required
              id="filled-image-input"
              //   label="ImageUrl"
              variant="filled"
              // type="url"
              type="file"
              // value={ImageUrl}
              placeholder={image}
              onChange={fileSelectedHandler}
              {...register("image", {})}
            />
            <TextField
              required
              id="filled-password-input"
              label="City"
              variant="filled"
              type="text"
              value={City}
              placeholder="City"
              {...register("City", {})}
            />
            <TextField
              required
              id="filled-password-input"
              label="Year"
              variant="filled"
              type="number"
              value={Year}
              placeholder="Year"
              {...register("Year", { required: true, maxLength: 4 })}
            />
            <TextField
              required
              id="filled-password-input"
              label="Gearbox"
              variant="filled"
              type="text"
              value={Gearbox}
              placeholder="Gearbox"
              {...register("Gearbox", {})}
            />
            <TextField
              required
              id="filled-password-input"
              label="Seats"
              variant="filled"
              type="number"
              value={Seats}
              placeholder="Seats"
              {...register("Seats", { required: true, max: 7, min: 1 })}
            />
            <TextField
              required
              id="filled-password-input"
              label="Doors"
              variant="filled"
              type="number"
              value={Doors}
              placeholder="Doors"
              {...register("Doors", { required: true, max: 5, min: 2 })}
            />
            <TextField
              required
              id="filled-password-input"
              label="Price"
              variant="filled"
              type="number"
              value={Price}
              placeholder="Price"
              {...register("Price", { required: true, max: 999, min: 1 })}
            />
            <div>
              <Button
                variant="outlined"
                type="submit"
                onClick={() =>
                  reset({
                    Make: "",
                    Model: "",
                    FullName: "",
                    ImageUrl: "",
                    City: "",
                    Year: "",
                    Gearbox: "",
                    Seats: "",
                    Doors: "",
                    Price: "",
                  })
                }
              >
                Reset
              </Button>
              <Button variant="contained" type="submit">
                {populated ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarForm;
