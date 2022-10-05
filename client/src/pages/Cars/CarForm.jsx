import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CarsContext } from "../../contexts/cars.context";
import { useParams } from "react-router-dom";
import "./CarForm.css";

function CarForm({ initialValues }) {
  const {
    addCar,
    updateCar,
    // formMode,
    // setFormMode,
  } = useContext(CarsContext);

  let { id } = useParams();
  const [populated, setPopulated] = useState(false);
  const [image, setImage] = useState("");

  const defaultValues = {
    Make: "",
    Model: "",
    FullName: "",
    // ImageUrl: "",
    City: "",
    Year: "",
    Gearbox: "",
    Seats: "",
    Doors: "",
    Price: "",
  };

  const {
    // errors,
    reset,
    formState,
    register,
    handleSubmit,
    control,
    errors,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  });

  const { isDirty, isValid } = formState;

  const fileSelectedHandler = (e) => {
    setImage(e.target.files[0]);
  };

  if (initialValues && !populated) {
    reset({
      ...initialValues,
    });
    setPopulated(true);
  }

  const onSubmit = async (formValues) => {
    if (populated) {
      const updates = {};
      for (const key in initialValues) {
        console.log(
          "🚀 ~ file: ProductForm.jsx ~ line 88 ~ onSubmit ~ initialValues",
          initialValues
        );
        if (initialValues.hasOwnProperty(key)) {
          if (initialValues[key] !== formValues[key] && key[0] !== "_") {
            console.log(
              "🚀 ~ file: ProductForm.jsx ~ line 94 ~ onSubmit ~ initialValues[key]",
              initialValues[key]
            );
            updates[key] = formValues[key];
            console.log(
              "🚀 ~ file: ProductForm.jsx ~ line 99 ~ onSubmit ~ updates[key]",
              updates[key]
            );
          }
        }
      }

      updateCar(id, updates);
    } else {
      addCar(formValues);
    }
    reset(defaultValues);
  };

  return (
    <Card
      sx={{ minWidth: 275, maxHeight: 900, boxShadow: 3 }}
      className="card-container"
    >
      <CardContent>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <TextField
              required
              id="Make"
              label="Make"
              variant="filled"
              type="text"
              placeholder="Make"
              {...register("Make", { required: true, maxLength: 80 })}
            />
            <TextField
              required
              id="filled-Model-input"
              label="Model"
              variant="filled"
              type="text"
              placeholder="Model"
              {...register("Model", { required: true, maxLength: 100 })}
            />
            <TextField
              required
              id="filled-FullName-input"
              label="FullName"
              variant="filled"
              type="text"
              placeholder="FullName"
              {...register("FullName", {})}
            />
            <TextField
              className="filled-image-input"
              required
              id="filled-image-input"
              label="image"
              variant="filled"
              // type="url"
              type="file"
              // value={ImageUrl}

              onChange={fileSelectedHandler}
              {...register("image", {})}
            />
            <TextField
              required
              id="filled-City-input"
              label="City"
              variant="filled"
              type="text"
              placeholder="City"
              {...register("City", {})}
            />
            <TextField
              required
              id="filled-Year-input"
              label="Year"
              variant="filled"
              type="number"
              placeholder="Year"
              {...register("Year", { required: true, maxLength: 4 })}
            />
            <TextField
              required
              id="filled-Gearbox-input"
              label="Gearbox"
              variant="filled"
              type="text"
              placeholder="Gearbox"
              {...register("Gearbox", {})}
            />
            <TextField
              required
              id="filled-Seats-input"
              label="Seats"
              variant="filled"
              type="number"
              placeholder="Seats"
              {...register("Seats", { required: true, max: 7, min: 1 })}
            />
            <TextField
              required
              id="filled-Doors-input"
              label="Doors"
              variant="filled"
              type="number"
              placeholder="Doors"
              {...register("Doors", { required: true, max: 5, min: 2 })}
            />
            <TextField
              required
              id="filled-Price-input"
              label="Price"
              variant="filled"
              type="number"
              placeholder="Price"
              {...register("Price", { required: true, max: 999, min: 1 })}
            />
            <div>
              <Button
                variant="outlined"
                type="submit"
                onClick={() => reset(defaultValues)}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={!isValid || !isDirty}
              >
                {populated ? "Update" : "Add"}Product
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarForm;
