//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mysql = require('mysql');
const config = require('./config/config')


// connection
const connection = mysql.createConnection(config.mysql);

connection.connect( (err)=> {
  (err) ? console.log(err): console.log(connection); 
});

// query function
const queriedTable = async (queryText) => {
  return new Promise((resolve, reject) => {
      connection.query(queryText, (err, results) => {
          if(err) {
              return reject(err);
          }
          resolve(results);
      });
  });
}

const apiRouter = express.Router();

// Use this to retrieve SQL records using GET. Enter a query into queryText.
// apiRouter.get('/', async (req, res) => {
  // const queryText = 'select * from TableName';
  //   try {
  //     let table =  await queriedTable(queryText);
  //     res.json(table);
  //   }
  //   catch (e) {
  //     console.log(e);
  //     res.sendStatus(500);
  //   }
// });

// retrieve SQL records using POST
apiRouter.post('/', async (req, res) => {
  try {
    const queryText = req.body.query;
    let table = await queriedTable(queryText);
    res.json(table);
  }
  catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// define the Express app
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

app.use(express.static('public'));
app.use(apiRouter);

// start the server
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Server listening on port: ${port}`));