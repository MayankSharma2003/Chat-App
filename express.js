const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const multer = require("multer");
var session = require("express-session");
const upload = multer({ dest: 'uploads/' });
const path = require('node:path');

const { Server } = require('socket.io');
const io = new Server(server);


const con = require("./models/mysql");
con.connect(function (error) {
    if (error) throw error;
    console.log("Connected");
});

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.set("view engine", "ejs");
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload.single('pic'));
app.use(
    session({
        secret: "Hello",
        resave: true,
        saveUninitialized: true,
    })
);

const verificationpages = require("./controllers/verificationpages");
const userpages = require("./controllers/userpages")
const chatpages = require("./controllers/chatpages")
const dashboardpages = require("./controllers/dashboardpages") 

app.get("/", function (request, response) {
    if (request.session.IsLoggedIn) {
        response.redirect('/user');
        return;
    }
    // console.log(__dirname);
    response.sendFile(__dirname + "/public/login.html");
});

app.get("/login",function(request,response){
    if (request.session.IsLoggedIn) {
        response.redirect('/user');
        return;
    }
    console.log(__dirname);
    response.sendFile(__dirname + "/public/login.html");
});

app.get("/signup",function(request,response){
    response.sendFile(path.join(__dirname+"/public/signup.html"));
});

app.get("/user", function (request, response) {
    if (!request.session.IsLoggedIn) {
        response.redirect('/');
        return;
    }
    response.render("user", {username : request.session.Username, userid : request.session.userid});
});

app.get("/openchat",function(request,response){
    if (!request.session.IsLoggedIn) {
        response.redirect('/');
        return;
    }
    response.render("chat");
});

app.get("/opendashboard", function (request, response) {
    if (!request.session.IsLoggedIn) {
        response.redirect('/');
        return;
    }
    response.sendFile(path.join(__dirname + "/public/dashboard.html"));
});

app.get("/getuser",userpages.getuser);
app.get("/allusers",userpages.allusers);
app.post("/creategroup",userpages.creategroup);
app.get("/invitationrequests",userpages.invitationrequests);
app.put("/acceptinvitation",userpages.acceptinvitation);
app.put("/deleteinvitation",userpages.deleteinvitation);

io.on('connection', (socket) => {
    socket.on("joingroup",(id)=>{
        socket.join(id);
        // console.log(111,id);
    });

    socket.on('chatmessage', (obj) => {
        // console.log(121,obj.groupid);
        chatpages.savemessage(obj);
        // console.log(obj);
        socket.to(obj.groupid).emit('msgfromserver', obj);
    });
});

app.get("/getgroups",chatpages.getgroups);
app.get("/getmessagesforgroup",chatpages.getmessagesforgroup);
app.get("/getnewuser",chatpages.getnewuser);
app.get("/sendnewrequest",chatpages.sendnewrequest);
app.get("/showallmembers",chatpages.showallmembers);

app.get("/gettopusers",dashboardpages.gettopusers);
app.get("/gettopgroups",dashboardpages.gettopgroups);
app.get("/gettopregions",dashboardpages.gettopregions);

app.get("/logout",function(request,response){
    request.session.destroy();
    response.redirect("/");
})

app.post("/signup", verificationpages.signup);
app.post("/login", verificationpages.login);
app.get("/verifyEmail/:userId", verificationpages.verifyEmail);
app.get("/confirmation", verificationpages.confirmation);

app.get("*", function (request, response) {
    response.sendFile(__dirname + "/public/404.html");
});

server.listen(8000, function () {
    console.log("Server is running on port 8000");
});
