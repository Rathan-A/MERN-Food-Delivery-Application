//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It provides a way to structure, validate, and manage data interactions in MongoDB using a more object-oriented approach. 

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    addressLine1: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
});

const User = mongoose.model("User", userSchema);
export default User;