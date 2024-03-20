// backend/app.js
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
var morgan = require('morgan') ///to be removed
const submissionRoutes = require('./routes/submissionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('combined')) //to  be removed
app.use(bodyParser.json());

// Routes
app.use('/api/submissions', submissionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
