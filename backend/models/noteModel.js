const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    meetingTopic: {
        type: String,
        required: true,
    },
    meetingNotes: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;