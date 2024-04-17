const express = require("express");
const port = 8000;

const app = express();

app.get("/", (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log("App listening on port: " + port);
});