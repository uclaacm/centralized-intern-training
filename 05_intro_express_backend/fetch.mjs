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
	const data = await response.json()
	return data
}

console.log("from function", await fetchData(url))