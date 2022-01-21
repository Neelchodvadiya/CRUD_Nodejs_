const express = require("express");
const app = express();
const ejs = require("ejs");
const cookieparser = require("cookie-parser");
const port = process.env.PORT || 8000;
const path = require("path");
require("./db/conn");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieparser());


const authrouter = require("./routes/auth.routes");
app.use("/auth",authrouter);


app.listen(port,()=>{
    console.log(`server running from port  ${port}`);
});




