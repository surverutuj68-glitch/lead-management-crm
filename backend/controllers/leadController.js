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

const getLeads = async (req, res) => {
    try{
        const allLeads = await Lead.find();
        
        return res.status(200).json({
        message: "Data fetched successfully!",
        "count": allLeads.length,
        "data": allLeads
        });
        }
        catch(error){
        res.status(500).json({
            message: "Unable to fetch data!",
            error: error.message
        });
    }
};

const updateLead = async (req, res) => {
    try {
        // get id
        const leadId = req.params.id;

        // get update data
        const updatedData = req.body;
        // update lead
        const updatedLead = await Lead.findByIdAndUpdate(leadId, updatedData, {new: true, runValidators: true});
        // if lead not found
        if (!updatedLead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        // success response
        res.status(200).json({
            message: "Data updated successfully!",
            data: updatedLead
        });
    } catch (error) {

        res.status(500).json({
            message: "Data update failed!",
            error: error.message
        });

    }
};

const deleteLead = async (req, res) => {
    try{
        const leadId = req.params.id;

        const deletedLead = await Lead.findByIdAndDelete(leadId);
        if(!deletedLead){
            return res.status(404).json({
                message: "Lead not found"
            });
        }
        return res.status(200).json({
            message: "Lead deleted successfully",
            data: deletedLead
        });
    }
    catch(error){
        res.status(500).json({
            message:"Failed to delete lead",
            error: error.message
        })
    }
}

module.exports = {
    createLead, getLeads, updateLead, deleteLead
};