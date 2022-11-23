# citylink_assignment


Create POST request REST API. The API should expect input payload as mentioned in the URL: https://clstorageapp.blob.core.windows.net/assignment/booking.json and do the following:

Parse the data and insert it into the database. Database can be MongoDB or MySQL.

Create two tables, one for user and other for booking info based on fields available in URL


User Table: userId, fullName, mobile, email

Booking Table: bookingId, bookingTime, pickupTime, sourceName, sourceAddress, sourceLocation, sourceCity, sourceState, sourcePostalCode, sourceCountry, sourceLatitude, sourceLongitude, destinationName, destinationAddress, destinationLocation, destinationCity, destinationState, destinationPostalCode, destinationCountry, destinationLatitude, destinationLongitude

Vendor Table: vendorId, driverName, vehicleNumber, vehicleMake, vehicleModel

Store the parsed data in the tables