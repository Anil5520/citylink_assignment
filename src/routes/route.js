const express = require('express');
const { bookingDetails } = require('../controller');
const router = express.Router();



router.post('/booking', bookingDetails);


//----------------------------- For invalid end URL -----------------------------//

router.all('/**', function (req, res) {
    return res.status(400).send({ status: false, message: "Invalid http request" })
})

module.exports = router; 