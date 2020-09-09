const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./Config');
const eventsRoutes = require('./routes/EventsRoutes');
const authRoutes = require('./routes/AuthRoutes');
const ngrok = require('ngrok');
const RateLimit = require('express-rate-limit');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('[INFO] MongoDB connected');
}).catch((err) => {
    console.log(`[ERROR] MongoDB connection error: ${err}`);
});

var limiter = new RateLimit({
  windowMs: 1*60*1000,
  max: 20,
  delayMs: 0
});

app.enable('trust proxy');  
app.use(limiter);

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

// connect ngrok and listen for requests
app.listen(config.PORT_LISTEN, () => {
    console.log('[INFO] Server listening...');
    console.log('[INFO] Trying to create ngrok tunnel...');
    (async function() {
        const url = await ngrok.connect(config.PORT_LISTEN);
        console.log(`[INFO] Tunnel created. Public server URL is: ${url}`);
    })();
});