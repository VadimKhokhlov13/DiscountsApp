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
        let gallery = $(this).data('gallery').map(link => link.replace('//', ''));
        let oldPrice = $(this).data('price');
        let newPrice = parseInt($(this).find('.js-cd-discount').text().split(' ').join(''));
        let sizesHtml = $(this).find('a.products-list-item__size-item');
        let sizes = [];
        sizesHtml.each(function(index) {
            sizes.push($(this).html());
        })
        let mainLink = `https://www.lamoda.ru${$(this).find('a.products-list-item__link').attr('href')}`;
        // let alt = $(this).find('img').attr('alt').split(',');
        // let brend = alt[1];
        // let color = alt[2].replace('цвет: ', '');
        // color = color.split('.')[0];
        let info = {
            // brend,
            // color,
            oldPrice,
            newPrice,
            sizes,
            gallery,
            mainLink
        }
        obj.push(info);
    })
    console.log(obj.length);
}

module.exports = { getPagesCount, parseHtml }