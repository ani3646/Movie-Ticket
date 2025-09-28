import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRouts.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = 3000;


//Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

await connectDB();

//API Routes
app.get("/", (req, res) => res.send("Server is live!"));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

// TEST

// Get movie details
app.get("/movie", async (req, res) => {
  const { id } = req.query; // IMDb ID
  if (!id) return res.status(400).json({ error: "Missing OMDb ID" });

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
