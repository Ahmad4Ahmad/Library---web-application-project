const express = require("express");
const connectDB = require("./connectDB");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");
const errorHandler = require("./middleWare/errorMiddleWare");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(
    {
        origin: ["http://localhost:3000", ""],
        credentials: true
    }
));
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.get("/", (req, res) => 
{

});

app.use(errorHandler);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const startServer = async () =>
{
    try
    {
        await connectDB();
        app.listen(port, () => {});
    }
    catch (error)
    {
        console.log(error);
    }
}

startServer();