import fetch from "node-fetch"

const url = 'http://localhost:8081/json'

fetch(url, {
	'Content-Type': 'application/json'
})
	.then(response => response.json())
	.then(data => console.log(data))

async function fetchData(url) {
	const response = await fetch(url, {
		'Content-Type': 'application/json'
	})
	console.log(response.status)
	const data = await response.json()
	return data
}

const data = await fetchData(url)

fetch('http://localhost:8081/hello')
	.then(response => response.text())
	.then(text => console.log(text))