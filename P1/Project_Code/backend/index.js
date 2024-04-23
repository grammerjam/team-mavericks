// Require Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require('./config/database');

// Require all models so they can be created
require('./models/');

const PORT = process.env.PORT;

const app = express();

// Allow CORS
app.use(cors());

/** Whitelist CORS ONLY FOR THE FRONT-END */

// Allow to read URL params from requests
app.use(express.urlencoded({ extended: false }));

// Set up JSON usage
app.use(express.json());

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
const { authRouter, userRouter } = require("./routes/");

// Incorporate Routes in Express App
app.use("/auth", authRouter);
app.use("/user", userRouter);

// POST http://localhost:8000/auth/register
// POST http://localhost:8000/auth/login
// POST http://localhost:8000/auth/logout

app.listen(PORT, () => {
    console.log("App listening on port: " + PORT);
});