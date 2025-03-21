const express = require("express")
const app = express()
const userRoute = require("./routers/userroutes");
const noteRouter = require("./routers/notesroutes");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config();

app.use(express.json())
app.use(cors())



app.use("/users",userRoute)
app.use("/notes",noteRouter)
app.get("/",(req,res)=>{
    res.send("Notes Api")
})
console.log("MONGO_URL:", process.env.MONGO_URL);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is started at port "+PORT)
    })

}).catch((error)=>{
    console.log(error)
})
    

