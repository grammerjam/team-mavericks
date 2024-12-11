// Require Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require('./config/database');
require('./models');

// Require all models so they can be created

const PORT = process.env.PORT;

const app = express();

// Allow CORS
app.use(cors({
  // origin: "https://boisterous-cassata-effa74.netlify.app",
  origin: "http://localhost:5173",
  credentials: true
}
));

/** Whitelist CORS ONLY FOR THE FRONT-END */

// Allow to read URL params from requests
app.use(express.urlencoded({ extended: false }));

// Set up JSON usage
app.use(express.json());

// Allow Cookie Parsing
app.use(cookieParser());

// Sync the Sequelize models with the MySQL database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
})();

// Import Custom Routers
const { authRouter, userRouter, bookmarkRouter, mediaRouter } = require("./routes/");

// Incorporate Routes in Express App
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/api",  bookmarkRouter);
app.use("/media", mediaRouter);

app.listen(PORT, () => {
    console.log("App listening on port: " + PORT);
});