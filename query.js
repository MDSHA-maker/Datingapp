  var now =new Date();
 var mili;
function Socketdb(){
var con = require("./chat.js");
var mysql = require('mysql');
this.mysql= mysql;
this.con = con;

 

 

}

Socketdb.prototype.addMessage =  function(room, message, handle,date ,callback) {
  con = this.con;
    mysql= this.mysql;
  
//mili=now.getTime();
//console.log(mili);
//var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
     

   console.log("Connected!"+date);
    var query = "INSERT INTO messages (name,message,handle,timestamp) VALUES( " + mysql.escape(room) + ","+ mysql.escape(message) +"," + mysql.escape(handle) + "," + mysql.escape(date)+" )" ;
    con.query(query ,callback)
    
};


  Socketdb.prototype.getMessage =  function(room,callback) {
    con = this.con;
      mysql= this.mysql;
        


      console.log("Connected!");
      var query = "SELECT message,handle,timestamp FROM messages WHERE name=" + mysql.escape(room);
      con.query(query, callback)
      



};


//   Socketdb.prototype.allMessage =  function(room,callback) {
//     con = this.con;
//       mysql= this.mysql;
//        


//       console.log("Connected!");
//         var query = "SELECT name FROM room WHERE user_1 IN (" + mysql.escape(user_1)+ ") OR user_2 IN (" +  mysql.escape(user_1)+ ")";
//       con.query(query, callback)
//       



// };









    Socketdb.prototype.createRoom =  function(user_1, user_2,callback) {
      con = this.con;
      mysql= this.mysql;
     room = Math.random().toString(36).substr(2, 100);
       


        console.log("Connected!");
        var query = "INSERT INTO room (name,user_1,user_2) VALUES ( " + mysql.escape(room) + ","+ mysql.escape(user_1) +"," + mysql.escape(user_2) + ")" ;
        
        con.query(query,callback)
           return room;
           
    };


      Socketdb.prototype.getRoom =  function(user_1, user_2,callback) {
        con = this.con;
        mysql= this.mysql;
          


          console.log("Connected!");
          var query = "SELECT name FROM room WHERE user_1 IN (" + mysql.escape(user_1)+"," + mysql.escape(user_2) + ") AND user_2 IN (" +  mysql.escape(user_2)+ ","+ mysql.escape(user_1) + ")";
          var qresult  =  con.query(query,callback);
          


      };





  Socketdb.prototype.handleDisconnect= function (){
  con= this.con;
 con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}




module.exports = Socketdb;