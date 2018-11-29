const puppeteer = require("puppeteer");
let browser = null
let page = null

async function scrape() {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
    await page.goto(
        "http://life.pingan.com/kehufuwu/fuwugongju/return_select.jsp?provice=81&city=187"
    );
    await page.waitFor(1000);
    let href = await page.evaluate(async () => {
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
    console.log(href);
    // await page.goto(href[0])
    for(let i=0; i<href.length; i++){
      await gotoSelfHome(href[i])
    }
}
//name  body > div.wrap > div.header > div > div.in_info > div.person > table > tbody > tr > td:nth-child(1) > h3
//body > div.wrap > div.header > div > div.in_info > div.person > p
async function gotoSelfHome(url) {
    return new Promise( async(resolve, reject) => {
        await page.goto(url);
        let skipbutton = await page.evaluate(async () => {
            if (document.querySelector("#skipbutton")) {
                return "#skipbutton";
            }
            return;
        });
        if (skipbutton) {
            await page.click(skipbutton);
            let info = await page.evaluate(async () => {
                let name = document.querySelector(
                    "body > div.wrap > div.header > div > div.in_info > div.person > table > tbody > tr > td:nth-child(1) > h3"
                );
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
            console.log(info);
            resolve()
        } else {
            await page.goBack({ waitUntil: "networkidle2" });
            resolve()
        }
    });
}

scrape();

// function wait(time){
//   return new Promise(resolve=>setTimeout(resolve,time))
// }
