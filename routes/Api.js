const express = require('express');
const router = express.Router();


const events = [
	{ name: 'Football match', description: 'Friendly match 6v6', date: '20.02.2020' , hour: '20:20', address: 'Wembley', discipline: 'Football', level: 1, participantsLimit: 10, key: '1' },
    { name: 'Jogging', description: 'Lets run!', date: '25.04.2020' , hour: '18:00', address: 'Kraków, Błonia', discipline: 'Running', level: 5, participantsLimit: 5, key: '2' },
    { name: 'Cycling trip', description: 'About 50 km trip, around Kraków', date: '03.07.2020' , hour: '06:00', address: 'Kraków, Rybitwy 3', discipline: 'Cycling', level: 3, participantsLimit: 3, key: '3' },
    { name: 'Chess game', description: 'I am looking for a partner for several rounds of chess', date: '03.04.2020' , hour: '20:00', address: 'Kraków, Plac Inwalidów', discipline: 'Chess', level: 2, participantsLimit: 1, key: '4' },
    { name: 'Lung run', description: '20 km run', date: '12.07.2020' , hour: '19:00', address: 'Kraków, Błonia', discipline: 'Running', level: 4, participantsLimit: 4, key: '5' }
];

// get a list of events
router.get('/events', (req, res) => {
    res.send(events);
});

module.exports = router;