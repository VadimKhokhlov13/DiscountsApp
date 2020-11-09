const cheerio = require('cheerio');

function getPagesCount(html) {
    const $ = cheerio.load(html);
    let countPages = Math.ceil(parseInt($('.products-catalog__head-counter').text()) / 60);
    return countPages;
}

function parseHtml(html) {

    const $ = cheerio.load(html);
    let sneakers = [];
    let blocks = $('.products-list-item');
    blocks.each(function(index) {
        let alt = '';
        if (index < 4) {
            alt = $(this).find('.products-list-item__img').attr('alt');
        } else {
            alt = $(this).find('.products-list-item_labels').children().eq(2).data('img').slice(32, alt.indexOf(',')); //32 это длина '236 341 products-list-item__img'
        }
        let category = alt.slice(0, alt.indexOf(','));;
        let brand = alt.slice(alt.indexOf(', ')+2, alt.indexOf(', цвет'));
        let color = alt.slice(alt.indexOf('цвет: ')+6, alt.indexOf('. Артикул'));
        let oldPrice = $(this).data('price');
        let newPrice = parseInt($(this).find('.js-cd-discount').text().split(' ').join(''));
        let sizesHtml = $(this).find('a.products-list-item__size-item');
        let sizes = [];
        sizesHtml.each(function() {
            sizes.push(parseFloat($(this).html().replace(',', '.')));
        })
        let gallery = $(this).data('gallery').map(link => link.replace('//', ''));
        let mainLink = `https://www.lamoda.ru${$(this).find('a.products-list-item__link').attr('href')}`;

        let sneaker = {
            category,
            brand,
            color,
            oldPrice,
            newPrice,
            sizes,
            gallery,
            mainLink
        }
        sneakers.push(sneaker);
    })
    console.log(sneakers);
    return sneakers;
}

module.exports = { getPagesCount, parseHtml }