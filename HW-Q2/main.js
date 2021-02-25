const apiurl = "http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees/"
const request = require('request')

request(apiurl, {json:true}, (err, res, body) =>{
    
    body.forEach(element => {
        console.log("Employee Id: "+element.id)
        console.log("Employee Name: "+element.name)
        console.log("Employee createdAt: "+element.createdAt)
        console.log("")
    });
    
   
})
