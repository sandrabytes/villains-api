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
    "movie": "the lion king",
    "image": "https://m.media-amazon.com/images/M/MV5BMTU1MzkwNDI5OV5BMl5BanBnXkFtZTgwODU2MTkwMDI@._V1_.jpg"
  },
  { 
    "id": 2,
    "name": "ursula", 
    "movie": "the little mermaid",
    "image": "https://i0.wp.com/foodandcosplay.org/wp-content/uploads/2020/08/ursula-scaled.jpg?fit=2560%2C2560&ssl=1"
  },
  { 
    "id": 3,
    "name": "cruella de vil", 
    "movie": "101 dalmatians",
    "image": "https://external-preview.redd.it/KNeOIDkHsvtta7UCQdkHE5P88Pia1m_Z6BGFxfuo1hk.jpg?auto=webp&s=67fd873934ae2ddefaa06091291b5b21094c64c4"
  },
  { 
    "id": 4,
    "name": "maleficent", 
    "movie": "sleeping beauty",
    "image": "https://d2ycltig8jwwee.cloudfront.net/reviews/1118/fullwidth.69c2e6cc.jpg"
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