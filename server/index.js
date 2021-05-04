const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const jobs = require('./routes/api/jobs');

app.use('/api/jobs', jobs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

