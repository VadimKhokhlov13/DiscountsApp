const Sneakers = require('./model');

async function saveDBSneakers(sneakers) {
    for (let i = 0; i < sneakers.length; i++) {
        await saveDBSneaker(sneakers[i]);
    }
}

function saveDBSneaker(item) {
    return new Promise(function(resolve, reject) {
        const sneaker = new Sneakers(item);
        sneaker.save(err => {
            if(err) {
                reject(err);
            }
            resolve('Saved successfully');
        });
    })
}

module.exports = { saveDBSneakers }