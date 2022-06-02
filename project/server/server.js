const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection = require('./db');
const app = express();
const port = 8000;



app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.json());
app.get('/getdata/:id', (req, res) => {
    var object = {
        selector: {
             "email": req.params.id
        }
    }
    dbconnection.fresher.find(object).then((data => {
        console.log("firstname", data);
        res.json(data);

    }))
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`server is listening on http://localhost:${port}`);
})
