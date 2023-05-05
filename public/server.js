const http = require('http');

const server = http.createServer((req, res) => {
  const fetch = import('node-fetch').then(module => module.default);

  const url = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
  const apiKey = 'YOUR_API_KEY';
  const keyword = 'カフェ';

  fetch(`${url}?key=${apiKey}&keyword=${keyword}`)
    .then(response => response.json())
    .then(data => {
      const items = data.results.shop.map(shop => `<li>${shop.name}</li>`).join('');
      const html = `<html><body><ul>${items}</ul></body></html>`;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(html);
      res.end();
    })
    .catch(error => console.log(error));
});

server.listen(8000);






