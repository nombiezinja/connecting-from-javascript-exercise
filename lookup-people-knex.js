const func = require('./knex-db');

//do all the manipulation inside this callback, now have access to return
func.query((people) => {
  console.log('Searching...');
  console.log(`Found ${people.length} person(s) by the name '${process.argv[2]}':`)
  people.forEach((item,index) => {
    console.log(`- ${item.id}:${item.first_name} ${item.last_name}, born '${item.birthdate.getFullYear()}-${item.birthdate.getMonth() + 1}-${item.birthdate.getDate()}'`);
  })

}, process.argv[2]);
