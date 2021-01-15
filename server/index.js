const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const { getFirstSneakers, getSneakers } = require('./sneakers');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// app.use(express.static(__dirname + '/public/'));
// app.get(/.*/, (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// app.post('/getHtml', async (req, res) => {
//     let pageNumber = req.body.pageNumber;
//     let html = await getHtml(pageNumber);

//     res.send(html);
// });

app.get('/getFirstSneakers', async (req, res) => {
    
    let collection = await getFirstSneakers();
    res.send(collection);
});

app.get('/sneakers', async (req, res) => {
    
  const params = req.query;
  const sneakers = await getSneakers(params);
  res.send(sneakers);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

async function start() {
    try {
      await mongoose.connect(
        'mongodb+srv://vadim:1q2w3e@cluster0.nmhrt.mongodb.net/DiscountsApp',
        {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        }
      )
      console.log('ok');
    } catch (e) {
      console.log(e);
    }
  }
  
start();