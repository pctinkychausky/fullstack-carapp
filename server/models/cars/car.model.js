import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bhp: {
    type: Number,
    required: true,
  },
  avatar_url: {
    type: String,
    default: "https://static.thenounproject.com/png/449586-200.png",
  },
  //   Make: {
  //     type: String,
  //     required: true,
  //   },
  //   Model: {
  //     type: String,
  //     required: true,
  //   },
  //   FullName: {
  //     type: String,
  //     required: true,
  //   },
  //   ImageUrl: {
  //     type: String,
  //     required: true,
  //   },
  //   City: {
  //     type: String,
  //     required: true,
  //   },
  //   Year: {
  //     type: Number,
  //     required: true,
  //   },
  //   Gearbox: {
  //     type: String,
  //     required: true,
  //   },
  //   Seats: {
  //     type: Number,
  //     required: true,
  //   },
  //   Doors: {
  //     type: Number,
  //     required: true,
  //   },
  //   Price: {
  //     type: Number,
  //     required: true,
  //   },
});

const Car = mongoose.model("Car", CarSchema);

export default Car;
