const cheerio = require('cheerio');

function getPagesCount(html) {
    const $ = cheerio.load(html);
    let countPages = Math.ceil(parseInt($('.products-catalog__head-counter').text()) / 60);
    return countPages;
}

function parseHtml(html) {

    let obj = [];
    const $ = cheerio.load(html);
    let blocks = $('.products-list-item');

    blocks.each(function(index) {
        let alt = 'qwerty';
        if (index < 4) {
            alt = $(this).find('.products-list-item__img').attr('alt');
        } else {
            alt = $(this).find('.products-list-item_labels').children().eq(2).data('img');
        }
        let brand = alt.split(',')[1].trim();
        let color = alt.slice(alt.indexOf(':')+2, alt.indexOf('.'));
        let modelName = $(this).find('.products-list-item__type').text().replace(/\n/g, '').trim();
        let oldPrice = $(this).data('price');
        let newPrice = parseInt($(this).find('.js-cd-discount').text().split(' ').join(''));
        let sizesHtml = $(this).find('a.products-list-item__size-item');
        let sizes = [];
        sizesHtml.each(function(index) {
            sizes.push($(this).html());
        })
        let gallery = $(this).data('gallery').map(link => link.replace('//', ''));
        let mainLink = `https://www.lamoda.ru${$(this).find('a.products-list-item__link').attr('href')}`;

        let info = {
            alt,
            brand,
            color,
            modelName,
            oldPrice,
            newPrice,
            sizes,
            gallery,
            mainLink
        }
        obj.push(info);
    })
    console.log(obj);
    // for (let i = 0; i < 5; i++) {
    //     console.log(obj[i]);
    // }
    
}

module.exports = { getPagesCount, parseHtml }