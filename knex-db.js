const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});


module.exports = {

  query: (cb, name) => {
    knex.select().table('famous_people')
      .where('last_name', name)
      .orWhere('first_name', name)
      .then(function(results) {
        cb(results);
        knex.destroy();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  insert: (cb, first_name, last_name, birthdate) => {
    console.log('Adding...');
    knex.insert({
      first_name: first_name,
      last_name: last_name,
      birthdate: birthdate
    })
    .into('famous_people')
    .then(() => {
      cb();
      knex.destroy();
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
