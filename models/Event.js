const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create event schema and model
const EventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },
    hour: {
        type: String,
        required: [true, 'Hour is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    discipline: {
        type: String,
        required: [true, 'Discipline is required']
    },
    level: {
        type: Number,
    },
    participantsLimit: {
        type: Number,
        required: [true, 'Participants limit is required']
    }
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;