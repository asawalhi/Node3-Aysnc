const request = require('request')
var express = require('express');
var app = express();
const fs = require('fs')
const fetch = require('node-fetch');

var h = null
var t = null

app.listen(2009, function() {
	console.log('nodeJS server projects API is running on port 2009');
});

//const employeeresults = employeeapi.employeeapi
//console.log(employeeresults)

app.get('/employees/:id', (req,res) => {
    fs.readFile('./Employee.json', (err,rslt) => {
     if (err){
         throw err
     }else{
         var q = req.params.id
         var jsonfile = JSON.parse(rslt)
         
         jsonfile.forEach(element => {
            if(element.id == q){
                h = element
                //write logic here
                console.log("q = "+q)
                console.log("h = "+JSON.stringify(h))
                console.log("this is : " + h.name + " projectid= " + h.projectId+ " dtls " + h.details.city)
                
                console.log("sent")
            }
         });
         if(h != null){
           
            res.send(h)
            return JSON.stringify(h)

         }else{
         res.send(jsonfile)
         return jsonfile

         }
     }
 })
 })


 app.get('/projects/:id', (req,res) => {
    fs.readFile('./Projects.json', (err,rslt) => {
     if (err){
         throw err
     }else{
         var q = req.params.id
         var jsonfile = JSON.parse(rslt)
         

         jsonfile.forEach(element => {
            if(element.id == q){
                t = element
                console.log("h = "+JSON.stringify(t))
                console.log("q = "+q)
                console.log("ths is : " + t.name + "id " + t.id+ "dtls " + t.details.customer)
            }
         });
         
         if(t != null){
            res.send(t)
            return JSON.stringify(t)
         }
         
     }
 })
 })


app.get('/getemployeedetails/:id', (req,res) => {
    var id = req.params.id

    fetch('http://localhost:2009/employees/'+id).then(res => res.json())
    .then(jsonemployee => fetch('http://localhost:2009/projects/'+jsonemployee.projectId)
        .then(res => res.json()).then(jsonproject => {
        const object = {
            name : jsonemployee.name, 
            city: jsonemployee.details.city,
            email: jsonemployee.details.email, 
            projectname: jsonproject.name,
            customer: jsonproject.details.customer
        }
        res.json(object)} )
        );

    
    /*request((empapiUrl+"?name="+q),{json: true}, (err,res,body) =>{
        empobj = body
        empprojectId = empobj.projectId
        //console.log(empprojectId)
    } )

    request((projapiUrl+"?projectId="+empprojectId), {json: true}, (err,res,body)=>{
        projobj = body
        //console.log(projobj)
    })


*/
})




