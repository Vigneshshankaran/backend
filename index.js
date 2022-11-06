const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('./models/user')

const { mongoose } = require('mongoose');
const app = express()
app.use(cors())

app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');
const router = require('./routes/posts');

app.use('/posts', postsRoute);




app.get('/', (req, res) =>{
    res.send('We are on home');
});


app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})


mongoose.connect(process.env.DB_CONNECTION, ()=>
console.log('db'))




app.listen(8800, ()=>
console.log('server'))