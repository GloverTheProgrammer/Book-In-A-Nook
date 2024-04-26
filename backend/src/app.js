require('dotenv').config();
const connection = require("./db");
const express = require('express');
const cors = require('cors');
const app = express();
const createUser = require("./routes/createUser");
const authRoutes = require("./routes/login");


// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/createUser", createUser);
app.use("/api/login", authRoutes);

// database connection 
connection();


// Server Running
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
app.get('/', (req, res) => res.send('Server Running'));