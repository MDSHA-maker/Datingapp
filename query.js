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


  Socketdb.prototype.allMessage =  function(room,callback) {
    con = this.con;
      mysql= this.mysql;

      console.log("Connected!");
         var query = "SELECT name FROM room WHERE user_1 IN (" + mysql.escape(user_1)+ ") OR user_2 IN (" +  mysql.escape(user_1)+ ")";
      con.query(query, callback)



};









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










module.exports = Socketdb;