const express =  require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());

const database = {
	users: [
	{
		id: '123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: 5,
		joined: new Date()
	},
		{
		id: '124',
		name: 'Zee',
		email: 'zee@gmail.com',
		password: 'chocolate',
		entries: 3,
		joined: new Date()
	}

	]
}

app.get('/', (req, res) =>{
	res.send('this  is working');
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		res.json('success'); 
	} else {
		res.status(400).json('error loging in!');
	}
})

app.post('/register', (req, res) => {

	const { email, name, password } = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email ,
		password: password,
		entries: 0,
		joined: new Date()
	})
})

app.get('/profile/:id', (req, res) => {
	 const { id } = req.params;
	 let found = false;
	 database.users.forEach(user => {
	 	if (user.id === id) {
	 		found = true;
	 		res.json(user);
	 	} else {
	 		res.json('no such user');
	 	}
	 })
	 if (!found) {
	 	res.status(400).json('not found');
	 }
})


app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
	 	if (user.id === id) {
	 		found = true;
	 		user.entries++
	 		res.json(user.entries);
	 	} else {
	 		res.json('no such user');
	 	}
	})
	if (!found) {
	 	res.status(400).json('not found');
	 }
})

app.listen(3000, () => {

	console.log('I am running smoothly on port 3000!')

})