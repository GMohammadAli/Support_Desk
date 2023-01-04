const path = require('path')
const express = require("express")
const colors = require('colors')
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 8000

//Connect to Mongo Database
connectDB()

const app = express()

// allows us to send raw JSON data
// This feature is now included in express 
// update in recent years
app.use(express.json())
//It parses incoming requests with urlencoded 
//payloads and is based on body-parser.
app.use(express.urlencoded({extended: false}))


//Routes
app.use('/api/users',require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Serve Frontend
if(process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname,"../frontend/build")))

    app.get('*', (req,res) => res.sendFile(__dirname,'../','frontend','build','index.html'))
} else {
    app.get("/", (req, res) => {
      res.status(200).json({ message: "Welcome to the Support Desk API" });
    });
}

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`))