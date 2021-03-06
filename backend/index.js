const express = require('express');
const adminRoute = require('./routes/Admin');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/', adminRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));
