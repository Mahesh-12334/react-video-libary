
var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");


var conStr = "mongodb://127.0.0.1:27017";
var app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


app.post("/register-user",(req,res)=>{
   var user = {
                UserId :req.body.UserId,
                UserName:req.body.UserName,
                UserPwd:req.body.UserPwd,
                Email:req.body.Email,
                phone:req.body.phone
           }
   mongoClient.connect(conStr).then(clientObject=>{
    var database = clientObject.db("react-video-library");
    database.collection("tbl-users").insertOne(user).then(function(){
        console.log("inserted......");
        res.end();
    });
   });
});


app.get("/get-users",(req,res)=>{
    mongoClient.connect(conStr).then(clientObject=>{
       var database = clientObject.db("react-video-library");
       database.collection("tbl-users").find({}).toArray().then(function(docs){
       res.send(docs);
        res.end();
       });
    });
});

app.get("/get-admin",(req,res)=>{
      mongoClient.connect(conStr).then(clientObject=>{
       var database = clientObject.db("react-video-library");
       database.collection("tbl-admin").find({}).toArray().then(function(docs){
       res.send(docs);
       res.end();
       });
    });
});

app.get("/get-categories", (req, res)=>{
    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblcategories").find({}).toArray().then(docs=>{
             res.send(docs);
             res.end();
        });
    });
});


app.post("/add-video", (req, res)=>{

    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        DisLikes: parseInt(req.body.DisLikes),
        Views: parseInt(req.body.Views),
        categoryId: parseInt(req.body.categoryId)
    }

    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").insertOne(video).then(()=>{
             res.end();
        })
    });
});

app.get("/get-videos", (req, res)=>{
    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").find({}).toArray().then(docs=>{
             res.send(docs);
             res.end();
        });
    });
});


app.get("/get-video/:id",function(req,res){
    var id  = parseInt(req.params.id);
    mongoClient.connect(conStr).then(function(clientObj){
        var database = clientObj.db("react-video-library");
        database.collection("tblvideos").find({VideoId:id}).toArray().then(function(docs){
            res.send(docs);
            res.end();
        });
    });
});


app.put("/edit-video/:id", (req, res)=>{
 
   var id =parseInt(req.params.id);
     
    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        DisLikes: parseInt(req.body.DisLikes),
        Views: parseInt(req.body.Views),
        categoryId: parseInt(req.body.categoryId)
    }

    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").updateOne({VideoId:id},{$set:video}).then(()=>{
             res.end();
        })
    });
});


app.delete("/delete-video/:id",function(req,res){
    var id = parseInt(req.params.id);

    mongoClient.connect(conStr).then(function(clientObj){
       var database = clientObj.db("react-video-library");
       database.collection("tblvideos").deleteOne({VideoId:id}).then(function(){
        res.end();
       })
    })
});

app.listen(2500);
console.log("server started.....");