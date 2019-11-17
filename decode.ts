const { promisify } = require('util');

const request = require('request');
const fs = require('fs');

const REQUEST_URL = require('./params').REQUEST_URL;

const testReqest = async (url: string) => {
  const res = await promisify(request.post)({
    url: REQUEST_URL,
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ url })
  })

  const decode = Buffer.from(JSON.parse(res.body).img, 'base64');

  await promisify(fs.writeFile)('sample.png', decode)
}

testReqest('https://qiita.com/toshihirock/items/b79b058937b873ec1925')
