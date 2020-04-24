const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ParticipantSchema = new Schema({
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String }
});


// create event schema and model
const EventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    hour: { type: String, required: true },
    address: { type: String, required: true },
    discipline: { type: String, required: true },
    level: { type: Number, min: 1, max: 5, default: 1 },
    owner: ParticipantSchema,
    participantsLimit: { type: Number, required: true },
    participants: [ParticipantSchema]
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;