 var express=require("express");
var app=express();
const bcrypt=require("bcryptjs")
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var passport =require("passport");
var LocalStrategy=require("passport-local");
const flash=require("connect-flash");
var methodoverride=require("method-override")
const session=require("express-session");
const multer = require('multer');
var braintree = require("braintree");


//const GridFsStorage = require('multer-gridfs-storage');
//const Grid = require('gridfs-stream');
var request=require("request");
const bodyparser=require("body-parser");
const path = require('path');
const crypto = require('crypto');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var socketdb = require("./query.js");
var soc= new socketdb();
var criteria=require("./models/criteria.js")
var criteriahere;
//const MongoURI='mongodb+srv://shahrul:wimberlycane74@uploaddata-xnnqp.mongodb.net/test?retryWrites=true&w=majority';
//connection
// Create mongo connection
/*const conn = mongoose.createConnection(MongoURI, { useNewUrlParser: true });
let gfs;
conn.once('open', () => {
  // Init stream
   console.log("Connection Open");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});*/
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://SHAHRUL:h29vkn$9AV@KUyu@cluster0-qhhoq.mongodb.net/test?retryWrites=true&w=majority";
// const mongoose = new MongoClient(uri);
// mongoose.connect(err => {
//     console.log(err);
//   const collection = mongoose.db("dateapp").collection("devices");
//   // perform actions on the collection object
//   mongoose.close();
// });
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://heroku_klswlvgt:uo2tumfdvrqjgpmo8fmh77m8ha@ds053597.mlab.com:53597/heroku_klswlvgt", {useNewUrlParser: true})
require('./config/passport')(passport);
const {ensureAuthenticated}=require('./config/keys');
app.use(bodyparser.urlencoded({extended:true}));

app.use(bodyparser.json());
app.set("view engine","ejs")
app.use(express.static("public"))
//set storage engine
const storage=multer.diskStorage({
   destination:'./public/uploads/',
   filename:function(req,file,cb){
      console.log(req.user);
      cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
      
      
   }
   
});

//init upload
const upload=multer({
   
   storage:storage,
   limits:{filesize:10000}
}).single('myImage');
var braintree = require("braintree");
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "4k6xdcnwmnf8zsdk",
  publicKey: "23v4mc94j95r497w",
  privateKey: "e6316d23b1ac92c2f8343a6913a0ccdc"
});



//MOngoure

//init
//create our storage object
// Create storage engine


/*users.create({
   
     
      name: "Monica" ,
      image:"https://previews.123rf.com/images/alfastudio/alfastudio1711/alfastudio171101661/89429393-hot-girl-trying-to-tear-a-t-shirt-on-a-gray-background.jpg"},function(err,users)
{
   if(err){console.log("error");}
     else {
        console.log("Newly created user");
     }
});*/
//express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,

}));
 //criteria={gender:"default",ethnicity:"default",age:"default",height:"default"};
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());

//global vars
app.use((req,res,next)=>{
   
   res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
       res.locals.error=req.flash('error' );
    next();
});




var users=require("./models/users");

//var seedDB=require("./seed");
//seedDB();


//---------------------------
 
/* var user=[
      
      { name: "Monica" ,image:"https://previews.123rf.com/images/alfastudio/alfastudio1711/alfastudio171101661/89429393-hot-girl-trying-to-tear-a-t-shirt-on-a-gray-background.jpg"},
    { name: "John", image: "https://i.pinimg.com/originals/16/66/cc/1666ccaa0140228d6f90c8c5ee8b378e.jpg"}                    ,
         
         {name:"Flora",image:"https://t3.ftcdn.net/jpg/02/14/52/34/500_F_214523426_9APpliHA9uj3EMel5aNUdDaHiXTjIVjH.jpg"}];*/
app.get("/",function(req,res){
   //criteria={gender:"default",ethnicity:criteri import {Color, Animal} from './Shapes';

   res.render("landing"); 
    
});
//Login control
app.get("/users/login",(req,res)=>{
criteriahere=new criteria("default","default","default","default");
   res.render("login")
})
app.post("/users/login",(req,res,next)=>
{
  passport.authenticate('local', {
    successRedirect: '/userprofiles',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next); 
});

        
    

    // users.find({"name":req.body.name,"email":req.body.email,"password":req.body.password,"gender":req.body.gender,"bodytype":req.body.bodytype,"age":req.body.age,"ethnicity":req.body.ethnicity,"height":req.body.height,"zipcode":req.body.zipcode},function(err,obj) { 
    //     console.log("found")
    //     console.log(obj); });
    
    
    
    
    
    

//updateing serach
app.post("/userprofiles/search",function(req,res){
   criteriahere.gender=req.body.gender;
     criteriahere.ethnicity=req.body.ethnicity;
      criteriahere.age=req.body.age;
       criteriahere.height=req.body.height;
  // criteriahere=req.body;
   //console.log(//criteria);
   res.redirect("/userprofiles");
   //res.redirect("/userprofiles",{//criteria:req.body});
   
})
/*
app.post('/register',(req,res)=>{
   
   const {name,email,password,password2}=req.body;
   let errors=[];
   //check required fields
   if(!name||!email||!password||!password2)
   {
      errors.push({msg:'Please fill in all fields'});
      
      
   }
   if(password!=password2)
   {
      errors.push({msg:'Passwords do not match'});
      
      
   }
   if(password<6){
      errors.push({msg:"Passwords must be greater than 6 characters"});
      
   }
   if(errors.length>0){
      
      res.render('register',{
         errors,name,email,password,password2
         
      });
   }
   else{
      User.findOne({email:email}).then(user=>{
         if(user){
            //User existers
            errors.push({msg:"Email is already there"})
               res.render('register',{
         errors,name,email,password,password2
         
      }
    
      
      
      
      );
            
         }});
      
   }
   
   
});
*/
//get request to user profile
app.get("/userprofiles",ensureAuthenticated,function(req,res){
  //GEt alll the users
   users.find({},function(err,allusers){
      if(err){
         console.log(err);
      }
      else
      {//console.log(parseInt(//criteria['age']));
     // currentuser=req.user;
            console.log(criteriahere)
           res.render("userprofiles",{users:allusers,currentuser:req.user,criteria:criteriahere});
         
      }
      
      
   });
   
 
   
});












//forgot password
app.get("/forgotpassword",(req,res)=>{
    
    res.render("forgot");
    
    
});
//passwordupdate
app.post("/newpassword",(req,res)=>
{
     var name=req.body.name;
   var image=req.body.image;
   var email=req.body.email;
   var age=req.body.age;
   var password=req.body.password;
   var password2=req.body.password2;
   var gender=req.body.gender;
   var ethnicity=req.body.ethnicity;
   var height=req.body.height;
   var zipcode=req.body.zipcode;
    var bodytype=req.body.bodytype;
   var errors=[];
 //console.log(req.body);
   if(!name||!email||!password||!password2)
   {
      errors.push({msg:'Please fill in all fields'});
      
      
   }
   if(password!=password2)
   {
      errors.push({msg:'Passwords do not match'});
      
      
   }
   if(password<8){
      errors.push({msg:"Passwords must be greater than 6 characters"});
      
   }
   if(errors.length>0){
      
      res.render('/forgot',{
         errors:errors
         
      });
   }

    else{//console.log(req.body);
    users.find( {
    $and : [
          { name : name }, { email: email },{age:age },{gender:gender},{ethnicity:ethnicity},{height:height},{zipcode:zipcode},{bodytype:bodytype}] },(err,found)=>{
              if(err) throw err;
              else{
                  var newpassword;
                  console.log(found);
                     bcrypt.genSalt(10,(err,salt)=>
                   bcrypt.hash(password,salt,(err,hash)=>
                     {
                        if (err) throw err;
                         
                        //console.log(hash);
                        
                       newpassword=hash;
                        users.findOneAndUpdate( { "email" : email },{"password":newpassword},{
                                                                  new: true,
                                                                  
                                                                },(err,done)=>{
                                                                  if (err) throw err;
                                                                  if(done){
                                                                      
                                                                     req.flash('success_msg','Password has been successfully updated!!!');
                                                              console.log('success_msg');
                                                              res.redirect("/");
                                                                  }
                                                                    
                                                                });
                             
                             
                        
                     }));
                       
                  
                      
                              //  users.findByIdAndUpdate( { "email" : email 
                  
                  
              }
              
          
    }
    );
        
        
    }
    
    
    
   } );
        
        


























//Logouthandle
app.get('/logout',(req,res)=>
{//currentuser="";
   req.logout();
   req.flash('success_msg','You are logged out');
   res.redirect('/');
})

//Create new user
//Create new user
app.post("/userprofiles/new",function(req,res){
   var name=req.body.name;
   var image=req.body.image;
   var email=req.body.email;
   var age=req.body.age;
   var password=req.body.password;
   var password2=req.body.password2;
   var gender=req.body.gender;
   var ethnicity=req.body.ethnicity;
   var height=req.body.height;
   var zipcode=req.body.zipcode;
    var bodytype=req.body.bodytype;
   var errors=[];

  //console.log(req.body);
   if(!name||!email||!password||!password2)
   {
      errors.push({msg:'Please fill in all fields'});
      
      
   }
   if(password!=password2)
   {
      errors.push({msg:'Passwords do not match'});
      
      
   }
   if(password<8){
      errors.push({msg:"Passwords must be greater than 6 characters"});
      
   }
   if(errors.length>0){
      
      res.render('new',{
         errors:errors
         
      });
   }
   
   else {
      //Validation passed
      users.findOne({email:email}).then(user=>{
         
         if(user){
            //user exists
            errors.push({msg:"Email is already register"})
            res.render('new',{
         errors:errors
         
      } );
         }
      
      else{//res.redirect("/userprofiles");
         
         
         var newUser =new users({name:name,email:email,password:password,image:image,gender:gender,bodytype:bodytype,age:age,ethnicity:ethnicity,height:height,zipcode:zipcode});
         //Hash password
         bcrypt.genSalt(10,(err,salt)=>
         bcrypt.hash(newUser.password,salt,(err,hash)=>
         {
            if (err) throw err;
            newUser.password=hash;
            newUser.save().then(
               user=>{
                  req.flash('success_msg','You are now registered!');
                  console.log('success_msg')
                  res.redirect("/");
               }
               
               
               ).catch(err=>console.log(err));
         }
         
         ))
      }
      
     
      })
      
    
   }
   

   
}); 
//create user page get request

app.get("/userprofiles/new",function(req,res){//must be declearead first
   res.render("new.ejs");
   
   
   
});
//show more info about a user
app.get("/userprofiles/:id",ensureAuthenticated,function(req,res){
   
   //find user with provided id
   //ender the show template
   
   console.log(req.params.id);
   //req.params give the html parameters sent by the req
   users.findById(req.params.id,function(err,Founduser){
      if(err)
      {
         console.log(err);
         
      }
      else{  console.log(req.user.name);
               //var current=req.user;
               var b=[String];
           b=req.user.visited;
           //b.push(req.params.id);
            if(req.user.visited.indexOf(req.params.id) > -1){
                console.log(req.user.visited.indexOf(req.params.id) );
           //users.findByIdAndUpdate(req.user.id,{"visited":b},{new: true},function(err,updatedblog){if(err){console.log("error")}});
                
            }
            else{console.log("here");
                b.push(req.params.id);
            }
          
             //  req.user.visited=req.user.visited.push(req.params.id)
             users.findByIdAndUpdate(req.user.id,{"visited":b},{new: true},function(err,updatedblog){if(err){console.log("error")}});
               console.log(req.user.visited);
           res.render('show',{userclicked:Founduser});
       
      }
      
   });

   
   
   
   
})

//upload images
//const upload = multer({ storage });
// @route GET /
// @desc Loads form
app.get("/uploads",ensureAuthenticated,function(req,res){
  //GEt alll the users
   users.find({},function(err,allusers){
      if(err){
         console.log(err);
      }
      else
      {//console.log(req.user);
     // currentuser=req.user;
    // //criteria = "default";
           res.render("upload",{users:allusers,currentuser:req.user});
         
      }
      
      
   });
});

app.post('/uploads',ensureAuthenticated,(req,res)=>{

   upload(req,res,(err)=>{
          if(err){ 
             res.render("/uploads",{
                
                msg:err
                
             });
             
             
          }
          
          else{
            if(req.file!=undefined){
            var a=[String];
            a=req.user.image;
            a.push(req.file.filename);
            users.findByIdAndUpdate(req.user.id,{"image":a},{new: true},function(err,updatedblog){
        
        if(err)
        {
            //res.redirect("/blogs");
        }
        else
        {
          //  res.send('test');
            res.redirect("uploads");
      //  res.redirect("/blogs/"+req.params.id);
            
        }
        
        
    });
               
          
            
            
          /*   req.user.image.push(req.file.filename);
            console.log(req.file.filename);
             console.log(req.user);
            req.users.save();
          res.send('test');
             */
          }
          else{res.redirect("/uploads")}
          
   }
          
          
      
      
   });

});








app.post('/proupload',ensureAuthenticated,(req,res)=>{
  
   upload(req,res,(err)=>{
          if(err){ 
             res.render("/upload",{
                
                msg:err
                
             });
             
             
          }
          
          else{
             if(req.file!=undefined){
            var a=[String];
            a=req.user.image;
            a[0]=req.file.filename;
            users.findByIdAndUpdate(req.user.id,{"image":a},{new: true},function(err,updatedblog){
        
        if(err)
        {
            //res.redirect("/blogs");
        }
        else
        {
          //  res.send('test');
            res.redirect("uploads");
      //  res.redirect("/blogs/"+req.params.id);
            
        }
        
        
    });
               
          
            
            
          /*   req.user.image.push(req.file.filename);
            console.log(req.file.filename);
             console.log(req.user);
            req.users.save();
          res.send('test');
             */
          }
                        else{res.redirect("/uploads")}
              
          }
          
          
          
          
          
          
      
      
   });
//   res.render("upload");
});


















//chat route
app.post("/chat",ensureAuthenticated,(req,res)=>{
   var oth_user=req.body;
   console.log(oth_user.clickeduser);
  res.redirect("/chat/"+oth_user.clickeduser);
   
})



app.get("/chat/:oth_user",ensureAuthenticated,(req,res)=>{
 //  res.send(req.body+req.user);
//console.log(req.params.oth_user);
 // res.redirect("/chat");
console.log(req.user.id) 
 var current_user=req.user.id;
 var oth_user=req.params.oth_user;
var currentUsername=req.user.name;
//mionlnn
name = soc.getRoom(current_user,oth_user,function(err, result) {
if (err){ 
soc.handleDisconnect();
throw err;
}
var resultnew;
console.log("The result is: " +result);
if (result==''){
    
     room= soc.createRoom(current_user,oth_user)
     console.log(room);
        
      soc.getMessage(room, function(err,messages){
          if (err){
              console.log('error for creating room');
              soc.handleDisconnect();
          }
          console.log(messages);
       
          console.log("other user"+oth_user);
          res.render('chat', {username: currentUsername, user:current_user ,otheruser:oth_user,room: room, messages:messages });
      }
      ) }
else{
      
      soc.getMessage(result[0].name, function(err,messages){
          if (err){
              soc.handleDisconnect();
          }
          console.log(messages);
          // res.render('chat', {username: currentUsername, otheruser:oth_user,room: room, messages:messages });
          res.render('chat', {username: currentUsername,user:current_user ,otheruser:oth_user, room:result[0].name, messages:messages });
      })
      
      
      
      
      
      
      
};
  
});









//jjnkn
   
   
})





io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
    
    
  });
});

io.on('connection', function(socket){
 
  socket.on('chat message', function(msg){
 
    socket.join(socket.handshake.query.room, function(err){if (err)console.log(err); else console.log("success")});
    console.log(socket.handshake.query.room);
   
    io.sockets.in([msg[1]]).emit('chat message', msg);
    soc.addMessage(msg[1], msg[0],msg[2],msg[3] ,function(err,result){
       
       if (err) { soc.handleDisconnect();}
       else{console.log(msg[0] + 'is being save to database');};
       
        
    })
  
    console.log('message: ' + msg);
  });
  //god
//     socket.on('video', function(msg){
//     socket.join(socket.handshake.query.name,function(err){if (err) console.log(err);else console.log("sucess")});
//     console.log(socket.handshake.query);
//     io.sockets.in(msg).emit('video');

//   });
  
  
  
  
  
  
});



//payments
app.get("/payment",ensureAuthenticated,(req,res)=>
{
   res.render("payment");
   
   
})

app.post('/payment',ensureAuthenticated,function(req,res){
  // Use the payment method nonce here
  console.log("made it here")
 // var value=false;
//var xd=req.user;
//console.log(xd);
    var nonceFromTheClient = req.body.paymentMethodNonce
     console.log(nonceFromTheClient);
    var newTransaction = gateway.transaction.sale({
      amount: '10.00',
      paymentMethodNonce: nonceFromTheClient,
      options: {
        // This option requests the funds from the transaction
        // once it has been authorized successfully
        submitForSettlement: true
        
        
      }
    }, function(error, result,xd) {
        if (result.success) {
          console.log("result is success" );
          res.send(result);
          //req.user.isPremium=true;
         
           users.findByIdAndUpdate(req.user.id,{"isPremium":true},{new: true},function(err,updatedblog){
        
        if(err)
        {
            //res.redirect("/blogs");
        }
        else
        {
          //  res.send('test');
          // res.send(result);
                   console.log(req.user);
               //   res.redirect("/userprofiles");
      //  res.redirect("/blogs/"+req.params.id);
            
        }
        
          
   
          //res.redirect("/userprofiles");
        } );}
        else {
               req.user.isPremium=false;
          console.log("result failed");
        }
      //  res.redirect("/userprofiles");
    });
   // console.log(value);
  });
  
  
  
//update route
app.get("/update",ensureAuthenticated,(req,res)=>{
    res.render("update");
    
    
})


app.post("/update",ensureAuthenticated,(req,res)=>{
    //res.render("update");
     
     users.findByIdAndUpdate(req.user.id,{"height":req.body.height,"name":req.body.name,"zip":req.body.zip,"age":req.body.age},{new: true},function(err,updateduser){
        
        if(err)
        {
            res.redirect("/update");
        }
        else
        {
        res.redirect("/userprofiles");
            
        }
        
        
    });
    
    
    
})
app.get("/groom",(req,res)=>
{
    res.render("groom");
    
})
app.get("/quiz",(req,res)=>
{
    res.render("quiz");
    
})
app.post("/groomresult",ensureAuthenticated,(req,res)=>
{
   // res.send(req.body.score);
   if(req.body.score>5){
   users.findByIdAndUpdate(req.user.id,{"isGroomed":true},{new: true},function(err,updateduser){
        
        if(err)
        {
            res.send(err)
        }
        else
        {
        res.redirect("/userprofiles");
            
        }
        
        
    });}
    
    else{ res.redirect("/userprofiles");}
    
    
})
//start server
http.listen(process.env.PORT||3000,function(){
   console.log("Dating server Started"); 
   
    
    
});
