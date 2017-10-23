const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userAgent = require('express-useragent');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(userAgent.express());

const PORT = process.env.PORT || 4568;

app.get('/',(req,res)=>{
    res.redirect('/api/whoami');
});

app.get('/api/whoami',(req,res)=>{
    res.send({
        ipaddress: req.ip,
        browser: `${req.useragent.browser} /version: ${req.useragent.version}`,
        operatinSystem: req.useragent.os,
        language: req.headers['accept-language'].split(';')[0].split(",")[0]
    });
});

app.listen(PORT, () => {
    console.log(`App is running on ${PORT} port`);
});
