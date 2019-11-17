const { promisify } = require('util');

const request = require('request');
const fs = require('fs');

const REQUEST_URL = "https://us-central1-cloudrun-test-259012.cloudfunctions.net/runPuppeteer";

const testReqest = async (url) => {
  const res = await promisify(request.post)({
    url: REQUEST_URL,
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ url })
  })

  console.log(JSON.parse(res.body))
  const decode = Buffer.from(JSON.parse(res.body).img, 'base64');

  const result = await promisify(fs.writeFile)('sample.png', decode)
  console.log(result)
}

testReqest('https://qiita.com/toshihirock/items/b79b058937b873ec1925')
