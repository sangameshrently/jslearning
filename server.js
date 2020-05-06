const express = require('express')
const app = express()
const port = 4000

// Middleware 1: Add body parser for put, post and get apis.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Middleware 2: Delay Middleware to simulate slow server
app.use((req, res, next) => setTimeout(next, 4000))

// this will be our Database.
let todos  = []

app.get('/todos', (req, res) => {
    console.log('GET');

    res.send(JSON.stringify(todos));
})

app.post('/todos', (req, res) => {
    console.log('POST');
    todos.push({ id: Date.now()+'', ...req.body });
    res.send(JSON.stringify(todos));
})

app.put('/todos', (req, res) => {
    console.log('PUT');

    todos = todos.map(todo => todo.id == req.body.id ? req.body : todo);
    res.send(JSON.stringify(todos));
})

app.delete('/todos', (req, res) => {
    console.log('DELETE');

    todos = todos.filter(todo => todo.id != req.body.id);
    res.send(JSON.stringify(todos));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))