import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: String, requires: true, ref: "User" },
    show: { type: String, requires: true, ref: "Show" },
    amount: { type: Number, requires: true },
    bookedSeats: { type: Array, requires: true },
    isPaid: { type: Boolean, default: false },
    paymentLink: { type: String },
  },
  { timeStamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
