var express =require("express")
var app=express();
var request=require("request");
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
 var user=[
      
      { name: "Monica" ,image:"https://previews.123rf.com/images/alfastudio/alfastudio1711/alfastudio171101661/89429393-hot-girl-trying-to-tear-a-t-shirt-on-a-gray-background.jpg"},
    { name: "John", image: "https://i.pinimg.com/originals/16/66/cc/1666ccaa0140228d6f90c8c5ee8b378e.jpg"}                    
         ];
app.get("/",function(req,res){
    
   res.render("landing"); 
    
});

app.get("/userprofiles",function(req,res){
  
   
   res.render("userprofiles",{user:user});
   
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Dating server Started"); 
    
    
});
app.post("/userprofiles",function(req,res){
   var name=req.body.name;
   var image=req.body.image;
   var newprofile={name:name, image:image }
   user.push(newprofile);
   //res.send("YOu hit post route");
   res.redirect("/userprofiles");
   
});
app.get("/userprofiles/new",function(req,res){
   res.render("new.ejs");
   
   
   
})