const url = "http://localhost:8081/json";

async function fetchData(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

const data = await fetchData(url);
console.log(data);

const created = await fetch("http://localhost:8081/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello", body: "My first post" }),
});
console.log(created.status, await created.json());

const hello = await fetch("http://localhost:8081/hello");
console.log(await hello.text());
