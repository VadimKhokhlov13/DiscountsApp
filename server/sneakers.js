const Sneakers = require('../parsers/lamoda/model');

async function getFirstSneakers() {
    const sneaker = await Sneakers.collection.findOne();
    return sneaker;
}

async function getSneakers(params) {
    let category = params.category && params.category.split(',');
    let brand = params.brand && params.brand.split(',');
    let sizes = params.sizes && params.sizes.split(',').map(n => +n);
    const sneaker = await Sneakers.find({
        category: {$in : category},
        brand: {$in : brand},
        sizes: {$in : sizes}
    });
    return sneaker;
}

module.exports = { getFirstSneakers, getSneakers }