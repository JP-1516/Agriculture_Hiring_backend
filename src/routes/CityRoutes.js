const routes=require('express').Router();
const citycontroller=require('../controllers/CityController')


routes.post("/addCity", citycontroller.addCity);    
routes.get("/getallcities", citycontroller.getCities);
routes.get("/getcitybystate/:stateId",citycontroller.getCityByStateId)
module.exports = routes;