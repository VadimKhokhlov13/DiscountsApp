const btnSubmit = document.getElementById('btnSubmit');

btnSubmit.addEventListener('click', async function() {
    let time = performance.now();
    let htmls = [];
    for (let i = 1; i <= 57; i++) {
        let html = await getHtml(i);
        console.log(i);
        htmls.push(html);
    }
    time = performance.now() - time;
    console.log(`Получено страниц: ${htmls.length}`);
    console.log(`Затрачено времени: ${Math.floor(time / 1000)} секунд`);
})

async function getHtml(pageNumber) {
    let responce = await fetch('/getHtml', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pageNumber})
    });
    let html = await responce.text();
    return html;
}