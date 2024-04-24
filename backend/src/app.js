require('dotenv').config();
const connection = require("./db");
const express = require('express');
const app = express();



app.get('/', (req, res) => res.send('Test nodemon!'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));


connection();