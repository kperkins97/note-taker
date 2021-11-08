const express = require('express');
const path = require('path')
const app = express();
const router = express.Router();
// const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 5500;

// middleware for JSON parsing and urlencoded form data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//GET route for the main page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//GET route for the note taking page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Helper function
const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

app.post('/notes', (req, res) => {
  // Informs client that a POST request was received
  res.json(`${req.method} request received to add your new note`);

  //Informs developer that a POST request was received in terminal
  console.info(`${req.method} request received to add user note`);

  // Destructuring assignment for the items in req.body
  const addNote = req.body;

  // if (addNote) {

  // }
  //giving new not an id
  addNote.id = uuid()

  // Read notes 
  const data = JSON.parse(fs.readFileSync("./db/db.json"));

  // Push new note to file
  data.push(addNote);


  fs.writeFileSync('./db/db.json', JSON.stringify(data))


  console.log("note created");
  res.json(data);

});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} !`)
);







// app.get('/api/reviews', (req, res) => {
//     // Inform the client
//     res.json(`${req.method} request received to get reviews`);
  
//     // Log our request to the terminal
//     console.info(`${req.method} request received to get reviews`);
//   });

// //post route - allow user to type notes and save it 
// app.post('/api/reviews', (req, res) => {
//     // Inform the client that their POST request was received
//     res.json(`${req.method} request received to add a review`);
  
//     // Log our request to the terminal
//     console.info(`${req.method} request received to add a review`);
//   });