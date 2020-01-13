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
    await page.goto(params.LOGIN_URL);

    await page.waitForSelector('#username').then(elem => elem.type(params.EMAIL))
    await page.waitForSelector('#password').then(elem => elem.type(params.PASS))
    await page.waitForSelector('.btn-primary').then(elem => elem.click())

    await page.waitFor(3000)

    const cookie = await page.cookies()
    console.log(cookie)

    fs.writeFileSync(params.COOKIE_PATH, JSON.stringify(cookie));
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
