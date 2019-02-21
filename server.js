const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp/:date_string?', (req, res) => {
    try {
        let date_string = req.params.date_string;
        let date = !date_string ? new Date() : new Date(date_string);
        if (Object.prototype.toString.call(date) === "[object Date]") {
            if (isNaN(date.getTime())) {
                res.json({ "error": "Invalid Date" });
            } else {
                res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
            }
        } else {
            res.json({ "error": "Invalid Date" });
        }
    } catch (error) {
        console.log(error);
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
