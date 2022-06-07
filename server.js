const { response, request } = require('express')
const express = require('express')
const cors = require('cors')
const { json } = require('express/lib/response')
const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())

let villains = [
  { 
    "id": 1,
    "name": "scar", 
    "movie": "the lion king"
  },
  { 
    "id": 2,
    "name": "ursula", 
    "movie": "the little mermaid"
  },
  { 
    "id": 3,
    "name": "cruella de vil", 
    "movie": "101 dalmatians"
  },
  { 
    "id": 4,
    "name": "maleficent", 
    "movie": "sleeping beauty"
  }
]
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})
app.get('/api/villains/', (request, response) => {
      response.json(villains)
})
app.get('/info', (request, response) => {
  const currentDate = new Date()
  response.send(`<h2>Webpage has info for ${villains.length} Villains</h2> <h2>${currentDate}</h2>`)
})


app.get('/api/villains/:name', (request, response) => {
  const name = request.params.name.toLocaleLowerCase()
  const entry = villains.find(entry => entry.name == name)
  if(entry){
    response.json(entry)
  }else {
    response.status(404).end()
  }
})

app.delete('/api/villains/:name', (request, response) => {
  const name = request.params.name.toLocaleLowerCase()
  villains = villains.filter(entry => entry.name != name)
  response.status(204).end()
})

const generateId = () => {
  const maxId = villains.length > 0
    ? Math.max(...villains.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/villains/', (request, response) => {
  const body = request.body
  if(!body.name) {
    return response.status(400).json({ error: 'name is missing' }
    )
  }
  if(!body.movie) {
    return response.status(400).json({ error: 'movie is missing' }
    )
  }
  if(villains.some(entry => entry.name === body.name)) {
    return response.status(409).json({ error: 'name must be unique' }
    )
  }
  let entry = {
    id: generateId(),
    name: body.name,
    movie: body.movie
  }

  villains.push(entry)
  response.json(entry)
})
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`)
})