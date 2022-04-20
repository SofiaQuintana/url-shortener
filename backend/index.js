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
app.get('/:id', (request, response) => {
    try {
        const hash = request.params.id; 
        if(hash in urls) {
            urls[hash].used = urls[hash].used + 1;
            response.status(200).redirect(urls[hash].originalURL);
        }else {
            response.status(404).send({message: "URL wasn't not found"});
        }
    } catch (error) {
        response.status(400).send({ message: error });
    }
})

app.post('/url', (request, response) =>{
    try {
        let url = request.body.url;
        let hash = crypto.randomBytes(3).toString('hex');
        if (!url.includes('http://') && !url.includes('https://')) {
            url = 'http://' + url;
        }
        urls[hash] = {
            shortURL:`http://localhost:${port}/${hash}`,
            originalURL: url,
            used: 0 };
        response.status(200).send({ url: urls[hash]});
    } catch (error) {
        response.status(400).send({ message: error });
    }
})

//Starting server
server.listen(port, () => {
    console.log(`Listening in port ${port}...`);
});
