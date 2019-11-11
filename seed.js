var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
/*

   name:{ 
   type:String,
   required:true },
   email:{ 
   type:String,
   required:true },
   password:{ 
   type:String,
   required:true, 
   minlength:6,
   maxlength:150

   },
   image:String,
   gender: String,
   ethnicity:String,
   height:String,
   bodytype: String,
   age:     { type: Number, min: 18, max: 65 },
   ratings: { type: Number, min: 0, max: 5 },
   zipcode: Number(),
   visited: [String],
   isPremium: { type: Boolean, default: false }
*/
var data=[
    
    {name:"Kristy",
    password:"nfaguosoa",
    email:"kristy@gmail.com",
    isPremium:false,
    
       image:"https://m.media-amazon.com/images/M/MV5BNjQxOGU0ODEtZGUyZC00MTFhLWEwZjAtNzE1NDkxZTgzZjBkXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg" ,
        gender:"female",
        ethnicity:"hispanic",
        height:"5'11",
        bodytype:"petite",
        age:21,
        ratings: 5,
        zipcode:62901,
        visited:"yes"
    },
     {name:"Kacey",
     password:"nfagufsafosoa",
    email:"kavcey@gmail.com",
    isPremium:true,
    
        image:"https://pbs.twimg.com/profile_images/912040222551969792/8BTz0tm0.jpg",
        gender:"female",
        ethnicity:"hippi",
        height:"5'11",
        bodytype:"busty",
        age:22,
        ratings: 5,
        zipcode:62961,
        visited:"yes"
    },
     {name:"Misty",
     password:"nffgasaguosoa",
    email:"fsaionoy@gmail.com",
    isPremium:false,
    
       image:"https://cdn.iflscience.com/images/1a575361-e74d-56b3-a2eb-7e6c9f49e339/author_extra_large-author.jpg",
        gender:"female",
        ethnicity:"hispanic",
        height:"5'11",
        bodytype:"petite",
        age:21,
        ratings: 4,
        zipcode:32901,
        visited:"yes"
    },
      {name:"dasristyds",
    password:"nfaguosdsasoa",
    email:"krisdsafty@gmail.com",
    isPremium:false,
    
       image:"https://m.media-amazon.com/images/M/MV5BNjQxOGU0ODEtZGUyZC00MTFhLWEwZjAtNzE1NDkxZTgzZjBkXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg" ,
        gender:"female",
        ethnicity:"hispanic",
        height:"5'11",
        bodytype:"petite",
        age:21,
        ratings: 5,
        zipcode:62901,
        visited:"yes"
    },
      {name:"Kristdsafy",
    password:"nfagdsaafuosoa",
    email:"kriadsdasty@gmail.com",
    isPremium:false,
    
       image:"https://m.media-amazon.com/images/M/MV5BNjQxOGU0ODEtZGUyZC00MTFhLWEwZjAtNzE1NDkxZTgzZjBkXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg" ,
        gender:"female",
        ethnicity:"hispanic",
        height:"5'11",
        bodytype:"petite",
        age:21,
        ratings: 5,
        zipcode:62901,
        visited:"yes"
    },
      {name:"Kridsasasty",
    password:"nfdasgasaguosoa",
    email:"kristgasgay@gmail.com",
    isPremium:false,
    
       image:"https://m.media-amazon.com/images/M/MV5BNjQxOGU0ODEtZGUyZC00MTFhLWEwZjAtNzE1NDkxZTgzZjBkXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg" ,
        gender:"female",
        ethnicity:"hispanic",
        height:"5'11",
        bodytype:"petite",
        age:21,
        ratings: 5,
        zipcode:62901,
        visited:"yes"
    }
    
    
    
    
    
    
    ]

var users=require("./models/users");

function seedDB(){
users.deleteMany({},function(err){
    
    if(err)
    {
        
        console.log(err);
    }
    else{
    console.log("removed campground");
        
data.forEach(function(seed){
    
    users.create(seed,function(err,data){
       if(err)
       {
           console.log("error inseed");
           
       }
       else{
           
           
       }
        
    });
    
});
        
        
    }
    // add a few users

});

}
module.exports=seedDB;