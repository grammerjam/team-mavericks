const express = require("express");
const cors = require("cors");
const port = 8000;

const app = express();

// Allow CORS
app.use(cors());

/** Whitelist CORS ONLY FOR THE FRONT-END */

// Allow to read URL params from requests
app.use(express.urlencoded({ extended: false }));

// Set up JSON usage
app.use(express.json());

// Custom Routes
const authRouter = require("./routes/auth.route");

// Incorporate Routes in Express App
app.use("/auth", authRouter);

// POST http://localhost:8000/auth/register
// POST http://localhost:8000/auth/login
// POST http://localhost:8000/auth/logout

app.listen(port, () => {
    console.log("App listening on port: " + port);
});