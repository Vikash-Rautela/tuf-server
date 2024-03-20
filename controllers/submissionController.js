const Submission = require('../models/submissionModel');

exports.submit = async (req, res) => {
    try {
        const submissionData = req.body;

        submissionData.output = req.output;

        const submission = await Submission.create(submissionData);
        res.status(201).json({ message: 'Submission successful', submission });
    } catch (error) {
        console.error('Error submitting code:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllSubmissions = async (req, res) => {
    try {
        const { username } = req.query;
        const submissions = await Submission.getAll(username);

        const sanitizedSubmissions = submissions.map(submission => ({
            id: submission.id,
            username: submission.username,
            code: submission.code,
            stdin: submission.stdin,
            output: submission.output,
            languageId: submission.languageId,
            submissionTime: submission.submission_time
        }));

        res.status(200).json(sanitizedSubmissions);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
