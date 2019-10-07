var express =require("express")
var app=express();
var mongoose = require('mongoose');

var request=require("request");
var bodyparser=require("body-parser");
mongoose.connect("mongodb://localhost/dateapp")
//Schema
var UserSchema=new mongoose.Schema({
   name: String,
   image:String
   
   
   
});


var users=mongoose.model("user",UserSchema);
/*users.create({
   
     
      name: "Monica" ,
      image:"https://previews.123rf.com/images/alfastudio/alfastudio1711/alfastudio171101661/89429393-hot-girl-trying-to-tear-a-t-shirt-on-a-gray-background.jpg"},function(err,users)
{
   if(err){console.log("error");}
     else {
        console.log("Newly created user");
     }
});*/










//---------------------------
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
/* var user=[
      
      { name: "Monica" ,image:"https://previews.123rf.com/images/alfastudio/alfastudio1711/alfastudio171101661/89429393-hot-girl-trying-to-tear-a-t-shirt-on-a-gray-background.jpg"},
    { name: "John", image: "https://i.pinimg.com/originals/16/66/cc/1666ccaa0140228d6f90c8c5ee8b378e.jpg"}                    ,
         
         {name:"Flora",image:"https://t3.ftcdn.net/jpg/02/14/52/34/500_F_214523426_9APpliHA9uj3EMel5aNUdDaHiXTjIVjH.jpg"}];*/
app.get("/",function(req,res){
    
   res.render("landing"); 
    
});

app.get("/userprofiles",function(req,res){
  //GEt alll the users
   users.find({},function(err,allusers){
      if(err){
         console.log(err);
      }
      else
      {
           res.render("userprofiles",{user:allusers});
         
      }
      
      
   });
   
 
   
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Dating server Started"); 
    
    
});
app.post("/userprofiles",function(req,res){
   var name=req.body.name;
   var image=req.body.image;
   var newprofile={name:name, image:image };
  /// user.push(newprofile);
   //create a new user
   users.create(newprofile,function(err,newuser){
      if(err)
      {
         console.log(err);
         
      }
      
      else
      {
        res.redirect("/userprofiles");
      }
      
   });
   
   
   //res.send("YOu hit post route");
 
   
});
app.get("/userprofiles/new",function(req,res){
   res.render("new.ejs");
   
   
   
});