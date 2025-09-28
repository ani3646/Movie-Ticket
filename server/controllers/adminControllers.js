import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

//API to check if user is admin
export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};

// API to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
    }).populate("movie");

    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce(
        (acc, bookings) => acc + bookings.amount,
        0
      ),
      activeShows,
      totalUser,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to get all show
// export const getAllShows = async (req, res) => {
//   try {
//     // const shows = (
//     //   await Show.find({ showDateTime: { $gte: new Date() } }).populate("movie")
//     // ).toSorted({ showDateTime: 1 });
//     const shows = await Show.find();
//     res.json({ success: true, shows });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// Search movies (multiple results)

const OMDB_API_KEY = "61eef1c3";
export const getAllShows = async (req, res) => {
  const { titles } = req.query;
  if (!titles) return res.status(400).json({ error: "Missing titles query" });

  const titleArray = titles.split(",").map((t) => t.trim());
  const results = [];

  try {
    for (const title of titleArray) {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${encodeURIComponent(
          title
        )}&apikey=${OMDB_API_KEY}`
      );
      const data = await response.json();
      if (data.Search) {
        results.push(...data.Search); // Flatten results
      }
    }

    res.json({ success: true, movies: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//API to get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
