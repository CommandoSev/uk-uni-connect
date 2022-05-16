const Note = require('../models/noteModel');

const asyncHandler = require('express-async-handler');

const submitNotes = asyncHandler(async(req, res) => {
    const { meetingTopic, meetingNotes } = req.body;

    const note = await Note.create({
        meetingTopic,
        meetingNotes,
    });
    if (note) {
        res.status(201).json({
            meetingTopic: note.meetingTopic,
            meetingNotes: note.meetingNotes,
        })
    } else {
        res.status(400)
        throw new Error('Error occured')
    }
});

module.exports = { submitNotes };