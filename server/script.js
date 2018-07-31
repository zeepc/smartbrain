const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'smart-brain'
  }
});

// db.select('*').from('users').then( data =>{
// 	console.log(data)
// });

const database = {
	users: [{
		id: '123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: 0,
		joined: new Date()
	},
		{
		id: '124',
		name: 'Zee',
		email: 'zee@gmail.com',
		password: 'chocolate',
		entries: 0,
		joined: new Date()
	}
	]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
	res.send(database.users);
})

app.post('/signin', (req, res) =>{
	const { email, name, password } = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail =>{
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'))
})


app.post('/register', (req, res) =>{
	const { email, name, password } = req.body;
	db('users').insert({
		email: email,
		name: name,
		joined: new Date()
	})
	.then(user => {
		res.json(user[0]);
	})
	.catch(err => res.status(400).json(err))
})

app.get('/profile/:id', (req, res) =>{
	 const { id } = req.params;
	 db.select('*').from('users').where({id}).then(user => {
	 	if(user.length){
	 		res.json(user[0])
	 	} else{
	 		res.status(400).json('Could not find user!')
	 	}
	 })
	 .catch(err => res.status(400).json('not found'))
})


app.put('/image', (req, res) =>{
	const { id } = req.body;
db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
})

app.listen(3000, () =>{
	console.log('I am running smoothly on port 3000!')
})