const express = require('express');
const cors = require('cors');
const metricsRoutes = require('./routes/metricRoutes')


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware for routes 
app.use("/api", metricsRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})