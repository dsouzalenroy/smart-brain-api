const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'qwerty',
    database : 'smart-brain'
  }
});


const app = express();

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) =>{ res.send('it is working') })//database variable no longer exists
// app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
// the above line can also be written as below
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) =>{image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) =>{image.handleAPICall(req, res)})


app.listen(process.env.PORT || 3000, () =>{
  console.log(`app is running on port  ${process.env.PORT}`);
})
