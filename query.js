  var now =new Date();
 var mili;
function Socketdb(){
// va connection= require("./chat.js");
var mysql = require('mysql');

var pool      =    mysql.createPool({
  connectionLimit : 1000, 
  host     : 'us-cdbr-iron-east-05.cleardb.net',
  user     : 'b5e82d70346410',
  password : '8617e451',
  database : 'heroku_5d0cbfe4c266954'
});
this.mysql= mysql;
 this.pool = pool;

 

}

function handle_database(req,res) {
   
    this.pool.getConnection(function(err,connection){
        if (err) {
          
          return;
        }  

        console.log('connected as id ' + connection.threadId);
       
        connection.query("select * from user",function(err,rows){
            connection.release();
            if(!err) {
                  
            }          
        });

        connection.on('error', function(err) {      
              
              return;    
        });
  });
}















Socketdb.prototype.addMessage =  function(room, message, handle,date ,callback) {
 
    mysql= this.mysql;
  
//mili=now.getTime();
//console.log(mili);
//var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
     

   this.pool.getConnection(function(err,connection){
        if (err) {
          
          return;
        }  

        console.log('connected as id ' + connection.threadId);
       
        var query = "INSERT INTO messages (name,message,handle,timestamp) VALUES( " + mysql.escape(room) + ","+ mysql.escape(message) +"," + mysql.escape(handle) + "," + mysql.escape(date)+" )" ;
        connection.query(query ,callback);
        connection.release();

        connection.on('error', function(err) {      
              
              return;    
        });
  });
    
};


  Socketdb.prototype.getMessage =  function(room,callback) {
   
      mysql= this.mysql;
       
    this.pool.getConnection(function(err,connection){
        if (err) {
          
          return;
        }  

        console.log('connected as id ' + connection.threadId);
       
      console.log("Connected!");
      var query = "SELECT message,handle,timestamp FROM messages WHERE name=" + mysql.escape(room);
      connection.query(query, callback)
      connection.release();
      

        connection.on('error', function(err) {      
              
              return;    
        });
  });


      



};


//   Socketdb.prototype.allMessage =  function(room,callback) {
//     connection= this.con;
//       mysql= this.mysql;
//        


//       console.log("Connected!");
//         var query = "SELECT name FROM room WHERE user_1 IN (" + mysql.escape(user_1)+ ") OR user_2 IN (" +  mysql.escape(user_1)+ ")";
//       connection.query(query, callback)
//       



// };









    Socketdb.prototype.createRoom =  function(user_1, user_2) {
      
      mysql= this.mysql;
    var Room;
     
        this.pool.getConnection(function(err,connection){
        if (err) {
           console.log("room not created");
          return;
        }  

        console.log('connected as id ' + connection.threadId);
       var room = Math.random().toString(36).substr(2, 100);
       Room=room;
    console.log("Connected!");
        var query = "INSERT INTO room (name,user_1,user_2) VALUES ( " + mysql.escape(room) + ","+ mysql.escape(user_1) +"," + mysql.escape(user_2) + ")" ;
        
        connection.query(query)
        connection.release();
           console.log("created room with :" + query);
         
      

        connection.on('error', function(err) {      
              
               
        });
        //  return room; 

  });
           
          
          console.log("room is now:" + Room)
          return Room;         

      
    };


      Socketdb.prototype.getRoom =  function(user_1, user_2,callback) {
     
        mysql= this.mysql;
          
        this.pool.getConnection(function(err,connection){
        if (err) {
          console.log("room not found");
          return;
        }  

        console.log('connected as id ' + connection.threadId);
       
       console.log("Connected!");
          var query = "SELECT name FROM room WHERE user_1 IN (" + mysql.escape(user_1)+"," + mysql.escape(user_2) + ") AND user_2 IN (" +  mysql.escape(user_2)+ ","+ mysql.escape(user_1) + ")";
          qresult  =  connection.query(query,callback);
          connection.release();
          console.log("the query result is :" + qresult);

        connection.on('error', function(err) {      
              
              
        });
        
      
  });



      
          


      };





  Socketdb.prototype.handleDisconnect= function (){
 
 connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}




module.exports = Socketdb;