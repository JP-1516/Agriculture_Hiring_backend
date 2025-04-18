const routes = require('express').Router();
const JobRequestController= require("../controllers/JobRequestController");
routes.post("/applyrequest",JobRequestController.request);
routes.delete("/deleterequest/:id", JobRequestController.deleteRequest);
routes.get("/getapplications/:id",JobRequestController.getUserApplications);
routes.get("/getrequest",JobRequestController.getallrequest);
routes.put('/updaterequest/:id', JobRequestController.updateRequestStatus);

module.exports = routes;
