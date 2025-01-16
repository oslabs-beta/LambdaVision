const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));




const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})