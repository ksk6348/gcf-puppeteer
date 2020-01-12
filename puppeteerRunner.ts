import puppeteer, {Browser} from 'puppeteer-core';

const runPuppeteer = async () => {
  let browser: Browser|undefined
  try {
    browser = await puppeteer.launch({
      executablePath: process.env.CHROME_BIN,
      headless: false,
      slowMo: 500,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
  
    const page = await browser.newPage();
    page.setDefaultTimeout(10000);
    await page.setViewport({ width: 1200, height: 800 })
    await page.goto('https://google.com');
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
