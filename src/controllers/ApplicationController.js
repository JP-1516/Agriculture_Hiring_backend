const ApplicationModel= require("../models/ApplicationModel");

const addApplication=async(req,res)=>{
    try {
        const savedApplication = await ApplicationModel.create(req.body);
        res.status(201).json({
          message: "Application added successfully",
          data: savedApplication,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

module.exports = { addApplication };