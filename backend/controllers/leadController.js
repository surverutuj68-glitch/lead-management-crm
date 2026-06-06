const Lead = require("../models/Lead")
const createLead = async (req, res) => {
    try {
        // get request data
        const leadData = req.body;
        // save to database
        const newLead = await Lead.create(leadData);
        // return saved document
        res.status(201).json({
            message: "Data received successfully!",
            data: newLead
        })

    } catch (error) {
        // return error response
        res.status(500).json({
            message: "Data not received!",
            error: error.message
        })
    }
};

module.exports = {
    createLead
};