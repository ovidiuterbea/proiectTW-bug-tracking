const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const projectRoutes = require("./routes/project-routes");
const bugRoutes = require("./routes/bug-routes");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/bugs", bugRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://vulturii1093:vulturii1093@vulturii.whyp0.mongodb.net/bugTracking?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8000);
    console.log("Connected to the bug-tracking database.");
  })
  .catch((err) => {
    console.log(err);
    console.log("Couldn't connect to the bug-tracking database.");
  });

// CEVA
