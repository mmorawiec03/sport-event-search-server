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

// join the event
router.put('/events/join/:id', eventsControllers.joinEvent);

// leave the event
router.put('/events/leave/:id', eventsControllers.leaveEvent);

// get user joined events
router.get('/events/joined/:userId', eventsControllers.getJoinedEvents);

// get user owned events
router.get('/events/owned/:userId', eventsControllers.getOwnedEvents);

// get events by discipline
router.get('/events/:discipline', eventsControllers.getEventsByDiscipline);

module.exports = router;