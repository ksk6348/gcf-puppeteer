import puppeteer, {Browser} from 'puppeteer-core';
import fs from 'fs';
import {params} from './params'

const runPuppeteer = async () => {
  let browser: Browser|undefined
  try {
    browser = await puppeteer.launch({
      executablePath: process.env.CHROME_BIN,
      headless: false,
      slowMo: 30,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
      ]
    });
  
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 })

    const cookies = JSON.parse(fs.readFileSync(params.COOKIE_PATH, 'utf-8'));
    for (let cookie of cookies) {
      console.log(cookie.expires)
      await page.setCookie(cookie);
    }
    await page.goto(params.USER_URL);

    await page.waitFor(10000)

    const text = await page.waitForSelector('.brand')
      .then(elem => elem.getProperty('textContent'))
      .then(elem => elem.jsonValue())
    console.log(text)
  } catch (err) {
    console.log(err)
  } finally {
    if (browser != undefined) {
      browser.close();
    }
    console.log("end")
  }
};

(async () => {
  await runPuppeteer()
})();
