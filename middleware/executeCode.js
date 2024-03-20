const axios = require('axios');

const executeCode = async (req, res, next) => {
    try {
        const { code, languageId, stdin } = req.body;

        const base64EncodedCode = Buffer.from(code).toString('base64');
        const base64EncodedStdin = Buffer.from(stdin).toString('base64');

        const headers = {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '07ab44556fmsh37cedface5edd4ep1f0281jsn460a227d4c2a',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        };

        const submissionResponse = await axios.post(
            'https://judge0-ce.p.rapidapi.com/submissions',
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

        const submissionToken = submissionResponse.data.token;

        await new Promise(resolve => setTimeout(resolve, 2000));

        const resultResponse = await axios.get(
            `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}`,
            {
                params: {
                    base64_encoded: 'true',
                    fields: '*'
                },
                headers
            }
        );
        req.output = Buffer.from(resultResponse.data.stdout, 'base64').toString('utf-8');
        next();
    } catch (error) {
        console.error('Error executing code:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = executeCode;
