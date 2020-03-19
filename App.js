const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./Config');
const eventsRoutes = require('./routes/EventsRoutes');
const authRoutes = require('./routes/AuthRoutes');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log(`MongoDB connection error: ${err}`);
});

// body-parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// initialize routes
app.use('/api', eventsRoutes);
app.use('/auth', authRoutes);

// error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({
        error: err.message
    });
});

// listen for requests
app.listen(config.PORT_LISTEN, () => {
    console.log('Server listening...');
});