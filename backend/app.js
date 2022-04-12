//_______________________________________________________________________________________
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const listRoutes = require('./routes/distBeiko');

//_______________________________________________________________________________________
const app = express();

//_______________________________________________________________________________________
// setting
app.set('name', 'Server');
app.set('port', process.env.PORT || 3001);

// midelware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ROUTES
app.use(listRoutes);

module.exports = app;

//_______________________________________________________________________________________
