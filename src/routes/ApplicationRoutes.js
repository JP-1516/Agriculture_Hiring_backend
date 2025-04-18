const routes=require('express').Router();
const Applicationcontroller=require('../controllers/ApplicationController')

routes.post("/addApplication", Applicationcontroller.addApplication);    
// routes.get("/allApplication",Apllicationcontroller.getAllApplivation);
module.exports = routes;