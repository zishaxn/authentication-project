const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.get("/", (req, res) => {
  // Example CORS headers in Express response
  res.header(
    "Access-Control-Allow-Origin",
    "https://your-frontend-app.vercel.app"
  );
  res.header("Access-Control-Allow-Credentials", true);

  res.send("Hello");
});
app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});

mongoose
  .connect(
    "mongodb+srv://zishan:Ja8epAlXnerGjdlJ@cluster0.pamvqgm.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["https://authentication-frontend-neon.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true, // Use 'credentials' instead of 'withCredentials'
  })
);


app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
