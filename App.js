const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/EventsRoutes');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/sport-event-search');

// body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', routes);

// error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({
        error: err.message
    });
});


// listen for requests
app.listen(3000, () => {
    console.log('Server listening...');
});