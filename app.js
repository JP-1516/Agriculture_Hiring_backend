const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()

app.use(express.json()) //to accept data as json...
app.use(cors())

//import role routes

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const userroutes= require("./src/routes/UserRoutes")
app.use(userroutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes) //
//http://localhost:3000/addState
//http://localhost:3000/state/addState

const cityroutes= require("./src/routes/CityRoutes")
app.use("/city",cityroutes)

const jobroutes= require("./src/routes/JobRoutes")
app.use("/job",jobroutes)

const Applicationroutes= require("./src/routes/ApplicationRoutes")
app.use("/application",Applicationroutes)

const JobRequestroutes = require("./src/routes/JobRequestRoutes")
app.use("/request",JobRequestroutes)

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})