const express = require('express');
const router = express.Router();
const Event = require('../models/Event');


// get a list of events
router.get('/events', (req, res, next) => {
    Event.find({}).then((events) => {
        res.send(events);
    });
});

// add a new event
router.post('/events', (req, res, next) => {
    Event.create(req.body).then((event) => {
        res.send(event);
    }).catch(next);
});

// update an event
router.put('/events/:id', (req, res, next) => {
    Event.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Event.findOne({_id: req.params.id}).then((event) => {
            res.send(event);
        });
    });
});

// delete an event
router.delete('/events/:id', (req, res, next) => {
    Event.findByIdAndRemove({_id: req.params.id}).then((event) => {
        res.send(event);
    });
});

module.exports = router;