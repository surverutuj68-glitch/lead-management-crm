const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");

router.post('/',leadController.createLead);
router.get('/', leadController.getLeads);
router.put('/:id', leadController.updateLead);

module.exports = router;