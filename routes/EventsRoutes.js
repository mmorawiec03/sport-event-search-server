const express = require('express');
const eventsControllers = require('../controllers/EventsControllers');
const authControllers = require('../controllers/AuthControllers');


const router = express.Router();

// get a list of events
router.get('/events', authControllers.accessTokenVerify, eventsControllers.getEvents);

// add a new event
router.post('/events', authControllers.accessTokenVerify, eventsControllers.addEvent);

// update an event
router.put('/events/:id', authControllers.accessTokenVerify, eventsControllers.updateEvent);

// delete an event
router.delete('/events/:id', authControllers.accessTokenVerify, eventsControllers.deleteEvent);

// join the event
router.put('/events/join/:id', authControllers.accessTokenVerify, eventsControllers.joinEvent);

// leave the event
router.put('/events/leave/:id', authControllers.accessTokenVerify, eventsControllers.leaveEvent);

// get user joined events
router.get('/events/joined/:userId', authControllers.accessTokenVerify, eventsControllers.getJoinedEvents);

// get user owned events
router.get('/events/owned/:userId', authControllers.accessTokenVerify, eventsControllers.getOwnedEvents);

// get events by discipline
router.get('/events/:discipline', authControllers.accessTokenVerify, eventsControllers.getEventsByDiscipline);

module.exports = router;