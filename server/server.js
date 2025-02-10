const express = require('express');
const cors = require('cors');
const awsRoutes = require('./routes/awsRoutes')
const authRoutes = require('./routes/authRoutes')
const connectDB = require("./config/db")


const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware for routes 
app.use("/api", awsRoutes);
app.use("/api", authRoutes );

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})