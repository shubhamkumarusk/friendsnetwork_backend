require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userLoginRouter  = require('./router/userlogin')
const userProfileRouter = require('./router/users')
const userPosts = require("./router/post")

const app = express()

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("DB is Connected")
}

app.use(express.json())
app.use('/',userLoginRouter.router)
app.use('/',userProfileRouter.router)
app.use('/',userPosts.router)
app.listen(process.env.PORT,()=>{
    console.log("Server is running....")
})
