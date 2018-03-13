// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var db = require('./models');

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/camario25/My_API/blob/master/README.md", // CHANGE ME
    baseUrl: "https://enigmatic-journey-30344.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Details about me"},
      {method: "GET", path: "/api/projects", description: "Display an index of all my projects"},
      {method: "POST", path: "/api/projects", description: "Create a new project entry"},
      {method: "PUT", path: "/api/projects", description: "Edit a previous project entry and update it"},
      {method: "DELETE", path: "/api/projects", description: "Destroy a project entry"}
    ]
  });
});

app.get('/api/profile', function(req, res) {
  res.json({
    name: "Mario Alcantar",
    githubUsername: "camario25",
    githubLink: 'https://github.com/camario25',
    personalSiteLink: 'https://camario25.github.io/',
    currentCity: 'San Francisco',
    favoriteCuisines: ['Indian', 'Thai', 'Japanese', 'Mexican', 'American']
  });
});



  
app.get('/api/projects/search', function search(req, res) {
  var searchTerm = req.query.q;
  console.log(searchTerm);
  db.Project.createIndex( { "$**": "text" } );
  db.Project.find( { $text: { $search: searchTerm } }, function(err, searchFind) {
    if (err) {
      console.log(err);
    } else {
      res.json(searchFind);
    }
  });
});

app.get('/api/projects', function(req, res) {
  db.Project.find({}, function(err, projects) {
    if (err) {
      return console.log('index error: ' + err);
    }
    res.json(projects);
  });
});

app.get('/api/projects/:id', function(req, res) {
  console.log(req.params.id);
  db.Project.findOne({_id: req.params.id},
     function(err, project) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(project);
      }
    });
  });
  
  app.post('/api/projects', function (req, res) {
  console.log('project create', req.body);
  var newProject = new db.Project({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    github: req.body.github
  });
  newProject.save(function(err, project) {
    if (err) {
      console.log(err);
      res.status(400).json({error: err});
    } else {
      res.status(201).json(user);
    }
  });
});

app.put('/api/projects/:id', function(req,res) {
  console.log('project update', req.params);
  console.log('body is', req.body);
  
  var projectId = req.params.id;
  
  db.Project.findOneAndUpdate({_id: projectId}, req.body, {new: true}, function(err, updatedProject) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(updatedProject);
    }
  });
});


app.delete('/api/projects/:id', function (req, res) {
  console.log('projects delete', req.params);
  var projectId = req.params.id;
  
  db.Project.findOndAndRemove({id: bookId}, function (err, deletedProject) {
    if (err) {
      console.log(err);
    } else {
      console.log(deletedProject);
      res.json(deletedProject);
    }
    });
  });


  
/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
