var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var passportLocalmongoose=require("passport-local-mongoose")
var UserSchema=new mongoose.Schema({
   name:{ 
   type:String,
   required:true,
   },
   email:{ 
   type:String,
   required:true },
   password:{ 
   type:String,
   required:true, 
   minlength:6,
   maxlength:150

   },
   image:{type:[String],
         default: ['']
   },
   gender: {type:String,
         default: ''
   },
   ethnicity:{type:String,
         default: ''
   },
   height:{type:String,
      default: ''},
   bodytype: {type:String,
         default: ''
   },
   age:     { type: Number, min: 18, max: 65, required:true },
   ratings: { type: Number, min: 3, max: 5 },
   zipcode: {type:Number,   default: 62901},
   address:{type:String,
         default: ''
   },
   
   visited: {type:[String],default:''},
   isPremium: { type: Boolean, default: false },
   isGroomed: { type: Boolean, default: false },
   hobbies:{type:String,
         default: ''
   },
   interests:{type:String,
         default: ''
   }
   
});
module.exports=mongoose.model("users",UserSchema);

//var users=mongoose.model("user",UserSchema);