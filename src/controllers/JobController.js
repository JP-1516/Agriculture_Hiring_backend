const JobModel = require('../models/JobModel');


const addJob=async(req,res)=>{
    try {
        const savedJob = await JobModel.create(req.body);
        res.status(201).json({
          message: "Job added successfully",
          data: savedJob,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
const getAllJob = async(req,res)=>{
   try {
        const jobs = await JobModel.find();
        res.status(200).json({
          message: "All Jobs",
          data: jobs,
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
}

const getJobById = async (req, res) => {
  const foundJob = await JobModel.findById(req.params.id);
  res.json({
    message: "user fetched successfully..",
    data: foundJob,
  });
};

const getJobByUserId = async(req, res) => {
  try {
      const userId = req.params.id;
      
      // Add debug logging
      console.log(`Searching jobs for user ID: ${userId}`);
      
      const jobs = await JobModel.find({ userId: userId });
      
      console.log(`Found ${jobs.length} jobs`);
      
      res.status(200).json({
          success: true,
          message: jobs.length > 0 
              ? "Jobs fetched successfully" 
              : "No jobs found for this user",
          data: jobs
      });
      
  } catch (err) {
      console.error("Error in getJobByUserId:", err);
      res.status(500).json({ 
          success: false,
          message: "Server error while fetching jobs",
          error: err.message 
      });
  }
}

const deletedJob = async(req,res)=>{

  //delete from roles where id =?
  //req.params
//    console.log(req.params.id) //prams object...

  const deletedJob = await JobModel.findByIdAndDelete(req.params.id)

  res.json({
    message:"role deleted successfully..",
    data:deletedJob
  })
}
module.exports = { addJob,getAllJob,getJobById,deletedJob, getJobByUserId};