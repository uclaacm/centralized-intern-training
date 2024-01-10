const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.status(200).send('Birds homepage')
})

router.get('/about', (req, res) => {
	res.status(200).send('About birds')
})

router.use((req, res) => {
	res.status(404).send("No birds were found here!")
})

module.exports = router
