const bookingModel = require("./models/bookingModel");
const userModel = require("./models/userModel");
const vendorModel = require("./models/vendorModel");



const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}


let mobileRegex = /^[6-9]\d{9}$/;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let pincodeRegex = /^[1-9][0-9]{5}$/;
let cordRegex =/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/;


const bookingDetails = async function (req, res) {
    try {
        // data coming from request body
        const data = req.body;

        // body validation
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "Please provide booking details" });
        }

        // validations for request field
        if (!isValid(data.context)) {
            return res.status(400).send({ status: false, message: "Please enter Context" });
        }

        if (!isValid(data.type)) {
            return res.status(400).send({ status: false, message: "Please enter type" });
        }

        if (!isValid(data.bookingId) || isNaN(data.bookingId)) {
            return res.status(400).send({ status: false, message: "Please enter bookingId as numeric value" });
        }

        // I've changed the field name here because there are 2 "source" as key
        if (!isValid(data.source1)) {
            return res.status(400).send({ status: false, message: "Please enter source1" });
        }

        if (!isValid(data.status)) {
            return res.status(400).send({ status: false, message: "Please enter status" });
        }


        // validation for customer's detail
        if (!isValid(data.customer) || typeof data.customer != "object") {
            return res.status(400).send({ status: false, message: "Please enter customer field as an object" });
        } else {
            if (!isValid(data.customer.id) || isNaN(data.customer.id)) {
                return res.status(400).send({ status: false, message: "Please enter customer id as a numeric value only" });
            }
            if (!isValid(data.customer.fullName)) {
                return res.status(400).send({ status: false, message: "Please enter customer's fullName" });
            }
            if (!isValid(data.customer.mobile)) {
                return res.status(400).send({ status: false, message: "Please enter customer's mobile no." });
            }
            if (!mobileRegex.test(data.customer.mobile)) {
                return res.status(400).send({ status: false, message: "customer's mobile no is not valid" });
            }
            if (!isValid(data.customer.email)) {
                return res.status(400).send({ status: false, message: "Please enter customer's email id" });
            }
            if (!emailRegex.test(data.customer.email)) {
                return res.status(400).send({ status: false, message: "customer's email id is not valid" });
            }
        }


        // validations for source address
        if (!isValid(data.source) || typeof data.source != "object") {
            return res.status(400).send({ status: false, message: "Please enter source field as an object" });
        } else {
            if (!isValid(data.source.name)) {
                return res.status(400).send({ status: false, message: "Please enter source name" });
            }
            if (!isValid(data.source.address) || typeof data.source.address != "object") {
                return res.status(400).send({ status: false, message: "Please enter source address field as an object" });
            } else {
                let sourseAddress = data.source.address;
                if (!isValid(sourseAddress.address)) {
                    return res.status(400).send({ status: false, message: "Please enter source address" });
                }
                if (!isValid(sourseAddress.location)) {
                    return res.status(400).send({ status: false, message: "Please enter source location" });
                }
                if (!isValid(sourseAddress.city)) {
                    return res.status(400).send({ status: false, message: "Please enter source city" });
                }
                if (!isValid(sourseAddress.state)) {
                    return res.status(400).send({ status: false, message: "Please enter source state" });
                }
                if (!isValid(sourseAddress.postalCode)) {
                    return res.status(400).send({ status: false, message: "Please enter source postalCode/pincode" });
                }
                if (!pincodeRegex.test(sourseAddress.postalCode)) {
                    return res.status(400).send({ status: false, message: "sourse pincode is not valid" });
                }
                if (!isValid(sourseAddress.country)) {
                    return res.status(400).send({ status: false, message: "Please enter source country" });
                }
            }
            if (!isValid(data.source.latitude)) {
                return res.status(400).send({ status: false, message: "Please enter source latitude" });
            }
            if (!cordRegex.test(data.source.latitude)) {
                return res.status(400).send({ status: false, message: "enter valid source latitude" });
            }
            if (!isValid(data.source.longitude)) {
                return res.status(400).send({ status: false, message: "Please enter source longitude" });
            }
            if (!cordRegex.test(data.source.longitude)) {
                return res.status(400).send({ status: false, message: "enter valid source longitude" });
            }
        }


        // validations for destination address
        if (!isValid(data.destination) || typeof data.destination != "object") {
            return res.status(400).send({ status: false, message: "Please enter destination field as an object" });
        } else {
            if (!isValid(data.destination.name)) {
                return res.status(400).send({ status: false, message: "Please enter destination name" });
            }
            if (!isValid(data.destination.address) || typeof data.destination.address != "object") {
                return res.status(400).send({ status: false, message: "Please enter destination address field as an object" });
            } else {
                let destinationAddress = data.destination.address;
                if (!isValid(destinationAddress.address)) {
                    return res.status(400).send({ status: false, message: "Please enter destination address" });
                }
                if (!isValid(destinationAddress.location)) {
                    return res.status(400).send({ status: false, message: "Please enter destination location" });
                }
                if (!isValid(destinationAddress.city)) {
                    return res.status(400).send({ status: false, message: "Please enter destination city" });
                }
                if (!isValid(destinationAddress.state)) {
                    return res.status(400).send({ status: false, message: "Please enter destination state" });
                }
                if (!isValid(destinationAddress.postalCode)) {
                    return res.status(400).send({ status: false, message: "Please enter destination postalCode/pincode" });
                }
                if (!pincodeRegex.test(destinationAddress.postalCode)) {
                    return res.status(400).send({ status: false, message: "destination pincode is not valid" });
                }
                if (!isValid(destinationAddress.country)) {
                    return res.status(400).send({ status: false, message: "Please enter destination country" });
                }
                if (!isValid(destinationAddress.coordinates) || typeof destinationAddress.coordinates != "object") {
                    return res.status(400).send({ status: false, message: "Please enter destination coordinates as an object" });
                } else {
                    if (!isValid(destinationAddress.coordinates.latitude)) {
                        return res.status(400).send({ status: false, message: "Please enter destination latitude" });
                    }
                    if (!cordRegex.test(destinationAddress.coordinates.latitude)) {
                        return res.status(400).send({ status: false, message: "enter valid destination longitude" });
                    }
                    if (!isValid(destinationAddress.coordinates.longitude)) {
                        return res.status(400).send({ status: false, message: "Please enter destination longitude" });
                    }
                    if (!cordRegex.test(destinationAddress.coordinates.longitude)) {
                        return res.status(400).send({ status: false, message: "enter valid destination longitude" });
                    }
                }
            }
        }


        // validation for vendor's detail
        if (!isValid(data.vendor) || typeof data.vendor != "object") {
            return res.status(400).send({ status: false, message: "Please enter vendor field as an object" });
        } else {
            if (!isValid(data.vendor.id) || isNaN(data.vendor.id)) {
                return res.status(400).send({ status: false, message: "Please enter ventor id as a numeric value only" });
            }
            if (!isValid(data.vendor.fullName)) {
                return res.status(400).send({ status: false, message: "Please enter vendor's fullName" });
            }
            if (!isValid(data.vendor.vehicleNumber)) {
                return res.status(400).send({ status: false, message: "Please enter vendor's mobile no." });
            }
            if (!isValid(data.vendor.vehicleModel)) {
                return res.status(400).send({ status: false, message: "Please enter vendor's email id" });
            }
        }

        data.bookingTime = Date.now();
        data.pickupTime = Date.now()


        // checking the existing customer or creation of customer data
        let user = await userModel.findOne({ id: data.customer.id });
        if (!user) {
            await userModel.create({ id: data.customer.id, fullName: data.customer.fullName, mobile: data.customer.mobile, email: data.customer.email });
        }

        // checking the existing vendor or creation of vendor data
        let vendor = await vendorModel.findOne({ id: data.vendor.id });
        if (!vendor) {
            await vendorModel.create({ id: data.vendor.id, fullName: data.vendor.fullName, vehicleNumber: data.vendor.vehicleNumber, vehicleModel: data.vendor.vehicleModel });
        }


        // creation of booking details
        let bookingData = await bookingModel.create(data);
        return res.status(201).send({ status: true, data: bookingData });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}



module.exports = { bookingDetails }