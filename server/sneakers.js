const Sneakers = require('../parsers/lamoda/model');

async function getFirstSneakers() {
    const sneaker = await Sneakers.collection.findOne();
    return sneaker;
}

async function getSneakers(params) {
    let brand = params.brand ? params.brand.split(',') : false;
    let sizeMin =  +params.sizeMin || 0;
    let sizeMax = +params.sizeMax || 100;
    let priceMin = +params.priceMin || 0;
    let priceMax = +params.priceMax || 1000000;
    let sneakers = await Sneakers.find({
        newPrice: { $gte: priceMin, $lte: priceMax },
        sizes: { $elemMatch:  { $gte: sizeMin, $lte: sizeMax } }
    });
    if (brand) {
        sneakers = sneakers.filter(sneaker => brand.includes(sneaker.brand));
    }
    sneakers.forEach((sneaker, i) => {
        sneakers[i].gallery = sneaker.gallery[0];
        sneakers[i].sizes = sneaker.sizes.filter(size => size >= sizeMin && size <= sizeMax);
    })
    return sneakers;
}

module.exports = { getFirstSneakers, getSneakers }