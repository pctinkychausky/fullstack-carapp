import React, { useContext, useState } from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CarsContext } from "../../contexts/cars.context";
import { useParams } from "react-router-dom";
import "./CarForm.css";
import { NavLink } from "react-router-dom";

function CarForm({ initialValues }) {
  const { addCar, updateCar } = useContext(CarsContext);

  let { id } = useParams();
  const [populated, setPopulated] = useState(false);
  const [image, setImage] = useState("");

  const defaultValues = {
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
  };

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  });

  const { handleSubmit, formState, reset } = methods;
  const { errors, isValid, isDirty } = formState;

  // React.useEffect(() => {
  //   console.log("err2", formState.errors);
  // }, [formState]);

  // const onSubmit = (data) => {
  //   console.log("data", data);
  // };

  const onError = (err) => {
    console.log("err", err);
  };

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
        if (initialValues.hasOwnProperty(key)) {
          if (initialValues[key] !== formValues[key] && key[0] !== "_") {
            updates[key] = formValues[key];
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
    <Card sx={{ minWidth: 275, maxHeight: 900 }} className="card-container">
      <CardContent>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
              <Controller
                className="controller"
                name="Make"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    className="textfield"
                    label="Make"
                    variant="filled"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    error={!!errors.Make}
                    helperText={errors.Make?.message}
                  />
                )}
                rules={{ required: "information required!" }}
              />
              <Controller
                className="controller"
                name="Model"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    className="textfield"
                    label="Model"
                    variant="filled"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                  />
                )}
              />
              <Controller
                className="controller"
                name="FullName"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    className="textfield"
                    label="FullName"
                    variant="filled"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                  />
                )}
              />
              <Controller
                className="controller"
                name="City"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    className="textfield"
                    label="City"
                    variant="filled"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                  />
                )}
              />{" "}
              <Controller
                className="controller"
                name="Year"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    className="textfield"
                    label="Year"
                    variant="filled"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                  />
                )}
              />{" "}
              <Controller
                className="controller"
                name="Gearbox"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    className="textfield"
                    label="Gearbox"
                    variant="filled"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                  />
                )}
              />{" "}
              <Controller
                className="controller"
                name="Seats"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    className="textfield"
                    label="Seats"
                    variant="filled"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                  />
                )}
              />{" "}
              <Controller
                className="controller"
                name="Doors"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    className="textfield"
                    label="Doors"
                    variant="filled"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                  />
                )}
              />{" "}
              <Controller
                className="controller"
                name="Price"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    className="textfield"
                    label="Price"
                    variant="filled"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                  />
                )}
              />
              <div className="button">
                <NavLink to="/admin">
                  <Button variant="outlined" type="submit">
                    back
                  </Button>
                </NavLink>
                <Button
                  variant="outlined"
                  type="submit"
                  onClick={() => {
                    reset((defaultValues) => ({
                      ...defaultValues,
                    }));
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={!isValid || !isDirty}
                >
                  {populated ? "Update" : "Add"}
                  Product
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarForm;
