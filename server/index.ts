const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const handleContact = require('./contact');

const app = express();
const port = 8080;

app.use(cors());
app.use(compression());

// Have Node serve the files for our built React app
const publicRoot = path.resolve(__dirname, '../public');
app.use(express.static(publicRoot));

// Let the inner React app handle direct visits and refreshes on showcase tabs.
app.get('/os/*', (_req, res) => {
    res.sendFile(path.join(publicRoot, 'os', 'index.html'));
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/api/send-email', handleContact);

// listen to app on port 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
