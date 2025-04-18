const JobRequestModel = require("../models/JobRequestModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudanryUtil");

// Multer configuration
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadMiddleware = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed!'), false);
    }
  }
}).single("resume");

const request = async (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    try {
      if (err) {
        console.error(err);
        return res.status(400).json({
          message: err.message,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      // Upload to Cloudinary
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file.path);
      
      // Store data in database
      const jobApplication = {
        ...req.body,
        resume: cloudinaryResponse.secure_url,
        userId: req.body.userId,
        jobId: req.body.jobId
      };

      const Applyjob = await JobRequestModel.create(jobApplication);

      res.status(200).json({
        message: "Job application saved successfully",
        data: Applyjob,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  });
};

const deleteRequest = async (req, res) => {
  try {
    const deletedJobRequest = await JobRequestModel.findByIdAndDelete(req.params.id);
    if (!deletedJobRequest) {
      return res.status(404).json({
        message: "Request not found",
      });
    }
    res.json({
      message: "Request deleted successfully",
      data: deletedJobRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting request",
      error: error.message
    });
  }
};


// Get all applications for a specific user with job details
  const getUserApplications  = async(req, res) => {
    try {
        const userId = req.params.id;
        
        // Add debug logging
        console.log(`Searching jobs for user ID: ${userId}`);
        
        const jobs = await JobRequestModel.find({ userId: userId });
        
        console.log(`Found ${jobs.length} jobs`);
        
        res.status(200).json({
            success: true,
            message: jobs.length > 0 
                ? "Request fetched successfully" 
                : "No Request found for this user",
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
  
  const getallrequest = async (req, res) => {
    const foundJob = await JobRequestModel.find();
    res.json({
      message: "user fetched successfully..",
      data: foundJob,
    });
  };

  //update 
  const updateRequestStatus = async (req, res) => {
    const requestId = req.params.id;
    const { status } = req.body;
  
    try {
      const updatedRequest = await JobRequestModel.findByIdAndUpdate(
        requestId,
        { status },
        { new: true } // return the updated document
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }
  
      res.status(200).json({
        message: 'Request status updated successfully',
        data: updatedRequest,
      });
    } catch (error) {
      console.error('Error updating request status:', error);
      res.status(500).json({ message: 'Server error while updating request' });
    }
  };
module.exports = {
  request,
  deleteRequest,
  getUserApplications,
  getallrequest,
  updateRequestStatus
};