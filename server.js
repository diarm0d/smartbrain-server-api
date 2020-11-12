const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileInfo = require('./controllers/profileInfo');
const image = require('./controllers/image');

const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'diarmuidodonovan',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	db.select('*').from('users').then(data => {
	console.log(data);
});
})

app.get('/', (req, res) => {
	res.send('this is working');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })  

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get ('/profile/:id', (req, res) => { profileInfo.handleUserData(req, res, db )})

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { imageurl.handleAPICall(req, res) })

app.listen(3000, () => {
	console.log("app is running on port 3000");
});  

