// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var projectsList = [{
  name: "Portfolio Website",
  description: "Personal webpage",
  url: 'https://camario25.github.io/',
  github: 'https://github.com/camario25/camario25.github.io'}, 

  {name: "Flowing with Ruby",
  descripiton: "A Stack Overflow clone for Ruby and Rails",
  url: 'https://warm-taiga-81336.herokuapp.com/',
  github: 'https://github.com/camario25/project1-flowing-with-ruby'},

  {name: "Candy Compliment",
  description: "Random Valentine Generator",
  url: 'n/a',
  github: 'https://github.com/camario25/candyCompliment'},

  {name: "Geoquakes",
  descripiton: "An interactive map that shows the all earthquakes in the past week",
  url: 'https://camario25.github.io/Geoquakes/',
  github: 'https://github.com/camario25/Geoquakes'},

  {name: "Kaveh and Mario",
  description: "A music collaboration to produce and dj in the Bay Area and beyond",
  url: 'https://soundcloud.com/kavehandmario'}
];

db.Project.remove({}, function(err, projects) {
  console.log('removed all projects');
  db.Project.create(projectsList, function(err, projects) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all projects');
    console.log('created', projects.length, 'projects');
  });
});
    