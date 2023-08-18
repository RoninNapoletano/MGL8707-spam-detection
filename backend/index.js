const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const fs = require("fs/promises");
const _ = require("lodash");
const {v4: uuid} = require("uuid");

app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.get("/prediction", (req, res) => {
    console.log(req);
    console.log(res);

    res.sendStatus(200); // Changed to 200 for OK response
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});
