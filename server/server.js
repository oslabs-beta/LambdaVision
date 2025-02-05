const express = require('express');
const cors = require('cors');
const awsRoutes = require('./routes/awsRoutes')


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware for routes 
app.use("/api", awsRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})