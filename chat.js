var mysql = require("mysql");

console.log("works");


var conn = mysql.createConnection({
  host     : 'us-cdbr-iron-east-05.cleardb.net',
  user     : 'b5e82d70346410',
  password : '8617e451',
  database : 'heroku_5d0cbfe4c266954'
},function(err){
    
    if(err)
    {
        
        console.log("error");
    }
    
});




conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
   var rm = "CREATE TABLE room (name VARCHAR(255) NOT NULL, user_1 VARCHAR(255) NOT NULL ,user_2 VARCHAR(255) NOT NULL,PRIMARY KEY(name))";
   conn.query(rm, function (err, result) {
     if (err) throw err;
     console.log("room Table created");
   });
    var msg = "CREATE TABLE messages (name VARCHAR(255) NOT NULL , message VARCHAR(255) NOT NULL, handle VARCHAR(255)  NOT NULL, timestamp DATE NOT NULL, FOREIGN KEY (name) REFERENCES room(name))";
  conn.query(msg, function (err, result) {
    if (err) throw err;
    console.log("Messages Table created");
  });

});
console.log(conn)


module.exports= conn
