const express = require('express');
const eventsControllers = require('../controllers/EventsControllers');


const router = express.Router();

// get a list of events
router.get('/events', eventsControllers.getEvents);

// add a new event
router.post('/events', eventsControllers.addEvent);

// update an event
router.put('/events/:id', eventsControllers.updateEvent);

// delete an event
router.delete('/events/:id', eventsControllers.deleteEvent);

module.exports = router;