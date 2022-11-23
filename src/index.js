const express = require('express');
const bodyParser = require('body-parser');
// const route = require('./routes/route.js');
const mongoose = require('mongoose');
const { bookingDetails } = require('./controller');
const app = express();

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://Anil_5520:oHvOf7lGe6Rfj20Z@cluster0.dqgltt5.mongodb.net/citylink_assignment", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.post("/booking", bookingDetails);


app.listen(3000, function () {
    console.log('Express app running on port ' + 3000);
});