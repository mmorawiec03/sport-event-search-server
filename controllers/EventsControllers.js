const Event = require('../models/Event');


exports.getEvents = (req, res, next) => {
    Event.find({}).then((events) => {
        res.send(events);
    });
}

exports.addEvent = (req, res, next) => {
    Event.create(req.body).then((event) => {
        res.send(event);
    }).catch(next);
}

exports.updateEvent = (req, res, next) => {
    Event.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Event.findOne({_id: req.params.id}).then((event) => {
            res.send(event);
        });
    });
}

exports.deleteEvent = (req, res, next) => {
    Event.findByIdAndRemove({_id: req.params.id}).then((event) => {
        res.send(event);
    });
}

