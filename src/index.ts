import path from 'path'
import { createServer } from 'http'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  return res.render('index')
})

io.on('connection', (socket) => {
  console.log('A user connected...')

  socket.on('disconnect', () => {
    console.log('User disconnected...')
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

server.listen(5000, () => {
  console.log('Listening on *:5000')
})
