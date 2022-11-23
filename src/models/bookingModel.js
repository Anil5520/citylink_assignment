const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({

    context: { type: String, required: true },
    type: { type: String, required: true },
    bookingId: { type: String, required: true },
    source1: { type: String, required: true },      // I've changed the field name here because there are 2 source as key
    status: { type: String, required: true },

    customer: {
        id: { type: Number, required: true },
        fullName: { type: String, required: true },
        mobile: { type: String, required: true },
        email: { type: String, required: true }
    },

    source: {
        name: { type: String, required: true },
        address: {
            address: { type: String, required: true },
            location: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true }
    },

    destination: {
        name: { type: String, required: true },
        address: {
            address: { type: String, required: true },
            location: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
            coordinates: {
                latitude: { type: String, required: true },
                longitude: { type: String, required: true }
            },
        },
    },

    vendor: {
        id: { type: Number, required: true },
        fullName: { type: String, required: true },
        vehicleNumber: { type: String, required: true },
        vehicleModel: { type: String, required: true },
        vehicleMake: { type: String }
    },

    bookingTime: { type: Date },
    pickupTime: { type: Date }

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);