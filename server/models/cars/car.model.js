import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CarSchema = new Schema(
  {
    Make: {
      type: String,
      required: true,
    },
    Model: {
      type: String,
      required: true,
    },
    FullName: {
      type: String,
      required: true,
    },
    ImageUrl: {
      type: String,
      // required: true,
    },
    City: {
      type: String,
      required: true,
    },
    Year: {
      type: Number,
      required: true,
    },
    Gearbox: {
      type: String,
      required: true,
    },
    Seats: {
      type: Number,
      required: true,
    },
    Doors: {
      type: Number,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", CarSchema);

export default Car;
