const needle = require('needle');
const { parseHtml } = require('./parser');
const { saveDBSneakers } = require('./dbSneakers');

const baseLink = 'https://www.lamoda.ru/c/2981/shoes-krossovk-kedy-muzhskie/?display_locations=outlet&is_sale=1&page=';

function getHtml(link) {
    return new Promise(function (resolve) {
        needle.get(link, (err, res) => {
            if (err) throw err;
            resolve(res.body);
        });
    });
}

async function getPagesInfo() {
    console.log('start');
    let pageNumber = 1;
    while(true) {
        let html = await getHtml(`${baseLink}${pageNumber}`);
        let sneakers = parseHtml(html);
        if (sneakers == false) {
            break;
        }
        pageNumber++;
        // await saveDBSneakers(sneakers);
    }
    console.log('finish');
}

getPagesInfo();

module.exports = { getPagesInfo }