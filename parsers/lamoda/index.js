const mongoose = require('mongoose');
const { getPagesInfo } = require('./sneakersInfo');

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
      let res = await getPagesInfo();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  
start();