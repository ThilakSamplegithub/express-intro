const express=require("express")
const fs=require("fs")
const app=express()
app.use(express.json()) // useful to stringify
app.get("/",(req,res)=>{
    res.end("Hello world")
})
app.get("/data",(req,res)=>{
    // res.end("Data is sent")
    const data=fs.readFileSync("./db.json","utf-8")
    const parsed_data=JSON.parse(data)
    res.send(parsed_data)  // I get output still in strigified form inspite of parsing wait for concept of middleware
})
app.get("/student",(req,res)=>{
    const data=fs.readFileSync("./db.json","utf-8")
    const parsed_data=JSON.parse(data)
    res.send(parsed_data.student)
})
app.post("/addData",(req,res)=>{
    console.log(req.body)
    res.end("data has been recorded")
})
app.post("/addFile",(req,res)=>{
    const data=fs.readFileSync("./db.json",'utf-8')
    const parsed_data=JSON.parse(data)
    parsed_data.student.push(req.body)
    console.log(parsed_data,"is parsed data")
    res.send(parsed_data)// its not stringified but in server its stringified
    // am to add so stringify it
    fs.writeFileSync("./db.json",JSON.stringify(parsed_data))
    res.send("database updated")
    // res.end("json file been posted but not yet added in db.json file so we are going to write it not append it")
})
app.listen(4200,()=>{
    console.log("port is running")
})

// app.post("/add")