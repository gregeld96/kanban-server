require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const ip = process.env.IP || 'localhost';
const port = process.env.PORT || 3000;
const path = require('path');
const routes = require('./routes');
const errorHandler = require('./middlewares/error_handler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);
app.use(errorHandler);

app.listen(port, ip, () => {
    if(process.env.NODE_ENV === 'development'){
        console.log(`Server start : http://${ip}:${port}`);
    } else {
        console.log('Server start');
    }
})