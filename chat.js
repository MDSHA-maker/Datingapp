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

function handleDisconnect (){

 conn.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  conn.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

/*
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var rm = "ALTER TABLE messages MODIFY COLUMN timestamp VARCHAR(255)";
  conn.query(rm, function (err, result) {
     if (err) throw err;
     console.log("room Table created");
  });
//     var msg = "CREATE TABLE messages (name VARCHAR(255) NOT NULL , message VARCHAR(255) NOT NULL, handle VARCHAR(255)  NOT NULL, timestamp DATE NOT NULL, FOREIGN KEY (name) REFERENCES room(name))";
//   conn.query(msg, function (err, result) {
//     if (err) throw err;
//     console.log("Messages Table created");
//   });

});

*/


console.log(conn)


module.exports= conn
