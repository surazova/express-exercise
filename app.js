const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var parseUrlencoded = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//printing name
app.get('/', (request, response) => response.send('<h1>Sitora Urazova</h1>'))

//printing test
app.get('/test', (req, res) => res.send('<h1>Testing Environment</h1>'))

//dynamic route for name
app.get('/test/greet/:string', (req,res) => {
    const string = req.params.string;
    res.send(`<h1>Hello there, ${string}</h1>`)
})

//two numbers
app.get('/test/subtract', (req, res) => {  //to use: /test/subtract?num1=x&num2=y
   const num1 = parseInt(req.query.num1, 10);
   const num2 = parseInt(req.query.num2, 10);
   res.send(`<h1>Here is your result: ${num1} minus ${num2} is ${num1 - num2}</h1>`)
})

//post route that accepts a username and password 
app.post('/test/user', (req,res) => {
    const string = req.params.string; 
    res.json({result: string})
})

//username and password 
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "user" & password === "name") {
    res.status(202);
    res.json(`You are logged in`);
  } else {
    res.status(403).json(`Error 403: Invalid username and password, access forbidden`);
  }
});

//post for adding item to array
color = ['red', 'orange', 'yellow', 'green', 'blue'];

app.post('/color/:item', (req,res, next) => {
  const item = req.params.item;
  const ifRainbow = color.indexOf(item);

  if(ifRainbow == -1) { //if the item is not in the array, then add item to the array 
    color.push(item);
    res.status(202).json(`You successfully added ${item} to the rainbow!`);
  } else {
    res.status(409).json(`Error 409, ${item} already exists`); //look up a different status code or add another else 
  
    next();
  } 
  
});
  
//deleting an item
app.delete('/color/:item', (req,res) => {
  const item = req.params.item;
  const ifRainbow = color.indexOf(item);
  if (ifRainbow != -1) {
    color.splice(ifRainbow, 1);
    res.json(`You deleted ${item}`);
  } else {
    res.status(406).json(`${item} not accepted, ${item} already exists`);
  }
});


//port
const port = process.env.PORT || 5000 
app.listen(port, () => console.log(`App listening on port ${port}`))

