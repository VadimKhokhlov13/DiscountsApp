const needle = require('needle');

function getHtml(pageNumber) {
    let link = `https://www.lamoda.ru/c/5971/shoes-muzhkrossovki/?display_locations=outlet&is_sale=1&page=${pageNumber}`;
    return new Promise(function (resolve) {
        needle.get(link, (err, res) => {
            if (err) throw err;
            resolve(res.body);
        });
    });
}

module.exports = { getHtml }