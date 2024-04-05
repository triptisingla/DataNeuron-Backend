import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: "https://dataneuronf.netlify.app",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const ipCounts = {};

// Middleware to track IP addresses and increment count on each API call
app.use((req, res, next) => {
  const ip = req.ip; // Get the IP address of the requester
  if (!ipCounts[ip]) {
    ipCounts[ip] = { addCount: 0, updateCount: 0 }; // Initialize count for new IP address
  }
  // Increment count based on the API called
  if (req.path == '/api/v1/user/register') {
    ipCounts[ip].addCount++;
  } else if (req.path == '/api/v1/user/update') {
    ipCounts[ip].updateCount++;
  }

  next();
});

// Route to get the count of add API calls for a specific IP address
app.get('/add/count', (req, res) => {
  const ip = req.ip;
  const count = ipCounts[ip] ? ipCounts[ip].addCount : 0;
  res.json({ count });
});

// Route to get the count of update API calls for a specific IP address
app.get('/update/count', (req, res) => {
  const ip = req.ip;
  const count = ipCounts[ip] ? ipCounts[ip].updateCount : 0;
  res.json({ count });
});


app.use("/api/v1/user", userRoutes);


dbConnection();

export default app;
