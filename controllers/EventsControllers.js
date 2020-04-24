const Event = require('../models/Event');


exports.getEvents = (req, res, next) => {
    Event.find({}).then(events => {
        res.status(200).send(events);
    });
}

exports.addEvent = (req, res, next) => {
    Event.create(req.body).then(event => {
        res.status(200).send({ message: 'The event has been created successfully.' });
    }).catch(next);
}

exports.updateEvent = (req, res, next) => {
    Event.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        res.status(200).send({ message: 'The event has been updated.' });
    });
}

exports.deleteEvent = (req, res, next) => {
    Event.findByIdAndRemove({_id: req.params.id}).then(() => {
        res.status(200).send({ message: 'The event has been deleted.' });
    });
}

exports.joinEvent = (req, res, next) => {
    Event.findOne({_id: req.params.id}).then(event => {
        if (!event.participants.some(participant => participant.email === req.body.email)){
            event.participants.push(req.body);
            event.save(err => {
                if (err)
                    res.status(409).send({ message: 'Unable to join the event.' });
                else
                    res.status(200).send({ message: 'You joined the event successfully.' });
            });
        } else {
            res.status(409).send({ message: 'You already participate the event.' });
        }
    });
}

exports.leaveEvent = (req, res, next) => {
    Event.findOne({_id: req.params.id}).then(event => {
        event.participants.forEach(participant => {
            if (participant.userId === req.body.userId) {
                event.participants.id(participant._id).remove();
                event.save(err => {
                    if (err)
                        res.status(409).send({ message: 'Unable to leave the event.' });
                    else
                        res.status(200).send({ message: 'You have left the event successfully.' });
                });
            }
        });
    });
}

exports.getJoinedEvents = (req, res, next) => {
    Event.find({}).then(events => {
        let userEvents = events.filter(event => {
            return event.participants.some(participant => participant.userId === req.params.userId);
        });
        res.status(200).send(userEvents);
    });
}

exports.getOwnedEvents = (req, res, next) => {
    Event.find({}).then(events => {
        let userEvents = events.filter(event => {
            return event.owner.userId === req.params.userId;
        });
        res.status(200).send(userEvents);
    });
}

