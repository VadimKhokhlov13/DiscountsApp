const express = require('express');
const fs = require('fs');
const { getHtml } = require('./html');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.static(__dirname + '/public/'));
app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/getHtml', async (req, res) => {
    let pageNumber = req.body.pageNumber;
    let html = await getHtml(pageNumber);

    res.send(html);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});