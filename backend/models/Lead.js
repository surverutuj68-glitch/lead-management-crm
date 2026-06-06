const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    company: {
        type: String,
        required: [true, "Company name is required"]
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Qualified", "Converted", "Lost"],
        default: "New",
        required: true
    },
    notes: {
        type: String,
        trim : true
    },
},
    {
        timestamps: true
    })

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;