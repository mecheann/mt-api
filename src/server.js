import express from "express";
import { config } from "dotenv";
import { dbConnect, dbDisconnect } from "./config/db.js";
//import routes
import movieRoutes from "./routes/movieRoutes.js";

config();
dbConnect();

const app = express();

//API Routes
app.use("/movies", movieRoutes);

app.get("/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});
const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => {
    dbDisconnect().then(() => {
      process.exit(1);
    });
  });
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  server.close(() => {
    dbDisconnect().then(() => {
      process.exit(1);
    });
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  server.close(() => {
    dbDisconnect().then(() => {
      console.log("Process terminated.");
    });
  });
});
