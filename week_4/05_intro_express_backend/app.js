const express = require('express')
const app = express()
const port = 8081
var birds = require('./birds')

app.get('/users/:id', (req, res) => {
	res.status(200).send(req.params)
})

app.get('/hello', (req, res) => {
	res.status(200).send('Hello!')
})

app.get('/query', (req, res) => {
	let param1 = req.query.param1;
	let param2 = req.query.param2;
	res.status(200).send(`You input param1 to be $(param1) and param2 to be $(param2)`)
})

app.get('/json', (req, res) => {
	res.status(200).send({
		'test': 'test data'
	})
})

app.use('/birds', birds)

app.use((req, res) => {
	res.status(404).send("Endpoint does not exist")
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})