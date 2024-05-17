// app.js (javascript)
// Benjamin, Sam, Vinh, David
// Started: 
// Last edited: 2024-05-10 (yyyy mm dd)

require('dotenv').config();
const connection = require("./db");
const express = require('express');
const cors = require('cors');
const app = express();
const createUser = require("./routes/createUser");
const authRoutes = require("./routes/login");
const bookRoutes = require("./routes/books");


// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/createUser", createUser);
app.use("/api/login", authRoutes);
app.use("/api/books", bookRoutes);

// database connection 
connection();


// Server Running
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
app.get('/', (req, res) => res.send('Server Running'));
