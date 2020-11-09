const needle = require('needle');
const { getPagesCount, parseHtml } = require('./parser');
const { saveDBSneakers } = require('./dbSneakers');

const baseLink = 'https://www.lamoda.ru/c/2981/shoes-krossovk-kedy-muzhskie/?display_locations=outlet&is_sale=1&page=1';

function getHtml(link) {
    return new Promise(function (resolve) {
        needle.get(link, (err, res) => {
            if (err) throw err;
            resolve(res.body);
        });
    });
}

async function getPagesInfo() {
    let firstPageHtml = await getHtml(`${baseLink}1`);
    let pagesCount = 1; //getPagesCount(firstPageHtml);
    for (let i = 1; i <= pagesCount; i++) {
        let html = await getHtml(`${baseLink}${i}`);
        let sneakers = parseHtml(html);
        let saveResult = await saveDBSneakers(sneakers);
    }
    return 'ok';
}

getPagesInfo();

module.exports = { getPagesInfo }