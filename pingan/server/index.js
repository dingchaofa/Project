const puppeteer = require("puppeteer");
const fs = require('fs')
let browser = null;
let page1 = null;
let n = 1
let pingan = []

async function init(){
    browser = await puppeteer.launch({ headless: false });
    page1 = await browser.newPage();
    await page1.goto(
        "http://life.pingan.com/kehufuwu/fuwugongju/return_select.jsp?provice=81&city=187"
    );
    await page1.waitFor(1000);
    scrape(page1);
}
init()

async function scrape(page1) {
    // await page1.waitFor(1000);
    let href = await page1.evaluate(async () => {
        let href = [];
        // document.querySelectorAll('.geren_zhuye_s') //
        for (
            let i = 0;
            i < document.querySelectorAll(".geren_zhuye_s").length;
            i++
        ) {
            href.push(
                document
                    .querySelectorAll(".geren_zhuye_s")
                    [i].getAttribute("href")
            );
        }
        return href;
    });
    // console.log(href);

    for (let i = 0; i < href.length; i++) {
        // console.log(i);
        await gotoSelfHome(href[i]);
        if(i===href.length-1){
            let next_page = await page1.click('#next_page')
            if(!next_page){
                fs.writeFileSync('pingan.txt',JSON.stringify(pingan,null,4))
            }
            await page1.waitFor(2000);
            scrape(page1)
        }
    }
}
//name  body > div.wrap > div.header > div > div.in_info > div.person > table > tbody > tr > td:nth-child(1) > h3
//body > div.wrap > div.header > div > div.in_info > div.person > p
async function gotoSelfHome(url) {
    return new Promise(async (resolve, reject) => {
        const page = await browser.newPage();
        await page.waitFor(1000);
        const response = await page.goto(url);
        console.log("response", response._url);
        let query = response._url.includes('userId') && response._url.match(/userId=(.*?)&/)[1] || false //https://sales.pa18.com/recruitment.queryHomePageDetail.shtml?empNo=
        if(!query){
            await page.close()
            resolve()
        }
        await page.goto('https://sales.pa18.com/recruitment.queryHomePageDetail.shtml?empNo='+query)
        let info = await page.evaluate(async () => {
            let name = document.querySelector(
                "body > div.wrap > div.header > div > div.in_info > div.person > table > tbody > tr > td:nth-child(1) > h3"
            ).innerText;
            let tel = document
                .querySelector(
                    "body > div.wrap > div.header > div > div.in_info > div.person > p"
                )
                .innerText.match(/手   机：(\d{11})/)[1];
            return {
                name,
                tel
            };
        });

        console.log(n,info);
        pingan.push(info)
        n++
        await page.close()
        resolve()
        return
    });
}



// function wait(time){
//   return new Promise(resolve=>setTimeout(resolve,time))
// }
