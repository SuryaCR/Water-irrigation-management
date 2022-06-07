const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection = require('./db');
const exp = express();
const port = 8000;



exp.use(cors({
    origin: 'http://localhost:4200'
}));
exp.use(bodyParser.json());
exp.get('/getdata/:id', (req, res) => {
    const object = {
        selector: {
             "email": req.params.id
        }
    }
    dbconnection.fresher.find(object).then((data => {
        console.log("firstname", data);
        res.json(data);

    }))
})

exp.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`server is listening on http://localhost:${port}`);
})
