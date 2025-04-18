console.log("USER FILE CALL....!!!!!!")
var name ="ram"
var age =23
// single import karva mate module.exports 
// module.exports = name
// module.exports = age

// aakhu functions export karva 
const printuserdata =(a)=>{
    console.log("Print Userdata fron user.data.js file",a)
}

// jason formate ma exports karva 
module.exports={
    name,age,printuserdata
}