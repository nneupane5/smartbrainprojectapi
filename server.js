const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user:'postgres',
		password:'nirdesh',
		database:'smart-brain'
	}

});

// postgres.select('*').from('users').then(data => {
// 	console.log(data);
// });


const database = {
	users : [
	{
		id: '123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'Sally',
		email: 'sally@gmail.com',
		password: 'bananas',
		entries: 0,
		joined: new Date()
	}

	]
}

app.use(cors());
app.use(express.json());


app.get('/', (req, res)=> {
	res.send(database.users);
})

app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt) })
	// if (req.body.email === database.users[0].email &&
	// 	req.body.password === database.users[0].password) {
	// 	//res.json('success');
	// 	res.json(database.users[0]);
	// } else {
	// 	res.status(400).json('error logging in');
	// }

	


app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt) })


app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db) })
	// let found = false;
	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		return res.json(user);
	// 	}
	// })
	

app.put('/image', (req,res) => { image.handleImage(req, res, db) })
	// let found = false;
	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		user.entries++
	// 		return res.json(user.entries);
	// 	}
	// })
	// if (!found) {
	// 	res.status(400).json('not found');
	// }
	
	app.post('/imageurl', (req,res) => { image.handleApiCall(req, res ) })


app.listen(3000, ()=> {
	console.log('app is running on port 3000');
})