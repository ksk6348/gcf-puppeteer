const puppeteer = require('puppeteer');

exports.runPuppeteer = async (req, res) => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();
  if(req.body.url) {
    await page.goto(req.body.url)
  }else{
    await page.goto('https://google.com');
  }
  const img = await page.screenshot({encoding: "base64"});

  browser.close();

  res.send({ img })
};
