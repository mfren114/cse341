const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Personal Project');
});

const port = 3001;

app.listen(process.env.port || port);
console.log('Web Server is listening at port ' + (process.env.port || port));

