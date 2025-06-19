const express = require("express");
const app = express();
const port = 3000;
const connectdb = require("./initdb/connectdb");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth.route");
const gmailRouter = require("./routes/gmail.route");
const googleAnalytics = require("./routes/googleAnalysis.route");
const analyticsRouter = require("./routes/analitcs.route");
const auth = require("./middleware/jwtauth.middleware");
const jwtAuth = require("./routes/jwtauth.route");
dotenv.config();


connectdb();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/gmail-auth",authRouter);
app.use("/fetch-emails",gmailRouter);
app.use("/auth/google",authRouter);
app.use("/googleAnaltics",googleAnalytics);
app.use("/analytics",analyticsRouter);
app.use("/auth",jwtAuth);

app.get("/",(req,res)=>{
    res.send("this is the test page");
})

app.get('/api/protected', auth, (req, res) => {
  res.json({ message: 'You have accessed a protected route', userId: req.user.id });
});



app.listen(port,()=>{
    console.log(`listing on the port ${[port]}`);
})