import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import './config/database'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

const port = Number(process.env.PORT ?? 8000)

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`)
})