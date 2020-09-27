const mongoose = require('mongoose');

const SurveysSchema = mongoose.Schema({
    prompt: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Surveys', SurveysSchema);

