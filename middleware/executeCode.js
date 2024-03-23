const axios = require('axios');

const executeCode = async (req, res, next) => {
    try {
        const { code, languageId, stdin } = req.body;

        const base64EncodedCode = Buffer.from(code).toString('base64');
        const base64EncodedStdin = Buffer.from(stdin).toString('base64');

        const headers = {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.HOST
        };

        const submissionResponse = await axios.post(
            `${process.env.HOST_URL}/submissions`,
            {
                language_id: languageId,
                source_code: base64EncodedCode,
                stdin: base64EncodedStdin
            },
            {
                params: {
                    base64_encoded: 'true',
                    fields: '*'
                },
                headers
            }
        );

        if (submissionResponse.status !== 201) {
            throw new Error(`Submission failed with status ${submissionResponse.status}`);
        }

        const submissionToken = submissionResponse.data.token;

        await new Promise(resolve => setTimeout(resolve, 2000));

        const resultResponse = await axios.get(
            `${process.env.HOST_URL}/submissions/${submissionToken}`,
            {
                params: {
                    base64_encoded: 'true',
                    fields: '*'
                },
                headers
            }
        );

        if (resultResponse.status !== 200) {
            throw new Error(`Failed to fetch result with status ${resultResponse.status}`);
        }

        const resultData = resultResponse.data;


        req.output = Buffer.from(resultData.stdout, 'base64').toString('utf-8');
        next();
    } catch (error) {
        console.error('Error executing code:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = executeCode;
