const mongoose = require('mongoose');

const SubmissionsSchema = mongoose.Schema({
    prompt: {
        type: String,
        required: true
    },
    optionSelected: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Submissions', SubmissionsSchema);

