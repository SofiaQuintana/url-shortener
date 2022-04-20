const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const urls = [];

let app = express();
const server = require('http').createServer(app);
let port = 3030;

// Middlewares
app.use(express.json());
app.use(cors())

// Endpoints
app.get('/:id', (req, res) => {
    try {
        const hash = req.params.id; 
        if(value in urls) {
            urls[value].used = urls[value].used + 1;
            res.status(200).redirect(urls[hash].originalURL);
        }else {
            res.status(404).send({message: "URL wasn't not found"});
        }
    } catch (error) {
        res.status(400).send({ message: error });
    }
})

app.post('/url', (req, res) =>{
    try {
        let url = req.body.url;
        let hash = crypto.randomBytes(3).toString('hex');
        if (!url.includes('http://') && !url.includes('https://')) {
            url = 'http://' + url;
        }
        urls[hash] = {
            shortURL:`http://localhost:${port}/${hash}`,
            originalURL: url,
            used: 0 }
        res.status(200).send({ url: urls[hash]})
    } catch (error) {
        res.status(400).send({ message: error });
    }
})

//Starting server
server.listen(port, () => {
    console.log(`Listening in port ${port}...`);
});

