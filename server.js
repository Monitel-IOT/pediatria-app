// FIELDS

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;
// use cookie
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// using cors permitions
app.use(cors());
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This will fire our mongoose.connect statement to initialize our database connection
require('./config/config.mongoose');
// This is where we import the person routes function from our person.routes.js file
// const AllMyPersonRoutes = require('./routes/routes')
// AllMyPersonRoutes(app)

const server = app.listen(port, () => console.log(`Pediatrics app on port ${server.address().port}!`));
