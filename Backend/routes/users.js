var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const Survey = require('../models/Surveys');
const verify = require('./verifyToken');
const Submission = require('../models/Submissions');


// Create survey
router.post('/createsurvey', verify, async function (req, res) {
    try {
        const surveyExistsAlready = await Survey.findOne({prompt: req.body.prompt});
        if (surveyExistsAlready) return res.status(402).send("Survey Already Exists")

        const {prompt, option1, option2, option3} = req.body
        const survey = new Survey({
            prompt,
            option1,
            option2,
            option3
        })

        try {
            const savedSurvey = await survey.save();
            console.log(savedSurvey)
            res.status(200).send("localhost:3000/submitsurvey/:" + savedSurvey._id)
        } catch (e) {
            res.status(400).send("Could not save survey")
        }

    } catch (e) {
        throw (e)
    }
});

// route for submit survey
router.post('/submitSurvey', async function (req, res) {
    const submission = new Submission({
        prompt: req.body.prompt,
        optionSelected: req.body.optionSelected.toString()
    });

    console.log(submission)
    try {
        const savedSubmission = await submission.save();
        res.status(200).send(savedSubmission)
    } catch (e) {
        console.log(e)
        res.status(402).send("Could not submit survey")
    }
});


// route to get a particular survey to fill in SubmitSurvey Page
router.post('/getSurvey', async function (req, res) {
    try {
        const surveyExistsAlready = await Survey.findOne({_id: req.body._id});
        if (!surveyExistsAlready) return res.status(402).send("Survey Does Not Exist")

        res.status(200).send(surveyExistsAlready)
    } catch (e) {
        res.status(400).send("Could not save survey")
    }
});

router.post('/getAllSurveys', async function (req, res) {
    try {
        const getSurveys = await Survey.find({}, {_id: 0, __v: 0}).lean();  // lean allows you to convery Mongoose object to a plain object
        if (!getSurveys) return res.status(403).send("Survey does not exist")

        const promises = await getSurveys.map(async survey => {
            const Submissions = await Submission.find({prompt: survey.prompt}, {_id: 0, __v: 0}).lean();  // lean allows you to convery Mongoose object to a plain object
            return Submissions
        })

        // Submissions Objects
        const Submissions = await Promise.all(promises)


        // Map Submissions Objects to the Surveys
        for (let i = 0; i < getSurveys.length; i++) {
            if (Submissions[i].length !== 0) {
                getSurveys[i].submissions = Submissions[i]
            }
        }


        res.status(200).send(getSurveys)

    } catch (e) {
        console.log(e)
        res.status(400).send("Could not getAllSurveys")
    }
})


module.exports = router;


