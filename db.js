const pg = require("pg");
const settings = require("./settings"); // settings.json

const config = {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
};


module.exports = {

//a function for connect, a function for query, a function for done
//ORRRR one single function that has connect, query and done?
//run these functions in lookuppeople.js, return result
//manpulate result to output console.log
//done in carl's example is a callback function
  query: (cb, name) => {
    const client = new pg.Client(config);

    client.connect((err) => {
      if (err) {
        return console.error("Connection Error", err);
      }


      client.query("SELECT * FROM famous_people WHERE first_name = $1::VARCHAR OR last_name = $1::VARCHAR", [name], (err, result) => {
        if (err) {
          return console.error("error running query", err);
        }
        cb(result.rows);
      client.end();
      });

    });
  }
}