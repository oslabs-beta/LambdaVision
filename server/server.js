const express = require('express');
const cors = require('cors');
const awsRoutes = require('./routes/awsRoutes')
const userAuth = require('./routes/authRoutes')
const connectDB = require("./config/db")


const app = express();
connectDB();

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"], // Add your front-end origins
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
  })
);
  
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware for routes 
app.use("/api", awsRoutes);
app.use("/api", userAuth);

module.exports = app; // Export for testing 

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})