require('dotenv').config();
const connection = require("./db");
const express = require('express');
const cors = require('cors');
const app = express();
const createUser = require("./routes/createUser");
const authRoutes = require("./routes/login");


// middleware
app.use(cors());

// routes
app.use("/api/users", createUser);
app.use("/api/login", authRoutes);

// database connection 
connection();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));


// test
app.get('/', (req, res) => res.send('Server Running'));