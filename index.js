const express = require("express");
const app = express();

// connection with db
require("dotenv").config();
require("./db").connect();
const PORT = process.env.PORT;

// set body parser
const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(bodyParser.json());


  // set cors
  // const corsOptions = {
  //   origin: "http://localhost:5175",
  // };
const cors = require("cors");
app.use(cors());


// app routes setup
app.get('/',(req,res)=>{
  res.send('Hello world')
})


const authRoutes = require("./src/routes/auth");
app.use("/api", authRoutes());

const productRoutes = require("./src/routes/ProductRoutes");
app.use("/", productRoutes());

app.listen(PORT,()=>{
    console.log(`App is running on port : ${PORT}`)
})