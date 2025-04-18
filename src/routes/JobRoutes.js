const routes=require('express').Router();
const jobcontroller=require('../controllers/JobController')

routes.post("/addJob", jobcontroller.addJob);    
routes.get("/alljobs",jobcontroller.getAllJob);
routes.get("/alljob/:id",jobcontroller.getJobById)
routes.get("/getjob/:id",jobcontroller.getJobByUserId)
routes.delete("/deletejob/:id",jobcontroller.deletedJob);
module.exports = routes;