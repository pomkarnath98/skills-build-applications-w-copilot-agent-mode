import cors from 'cors'
import express, { type ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import Activity from './models/Activity'
import Leaderboard from './models/Leaderboard'
import Team from './models/Team'
import User from './models/User'
import Workout from './models/Workout'
import { connectDatabase } from './config/database'

export const app = express()
export const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean().exec())
})

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().lean().exec())
})

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().lean().exec())
})

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().sort({ points: -1 }).lean().exec())
})

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean().exec())
})

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error)

  if (!response.headersSent) {
    response.status(500).json({ error: 'Internal server error' })
  }
}

app.use(errorHandler)

export async function startServer() {
  await connectDatabase()

  const port = Number(process.env.PORT ?? 8000)
  app.listen(port, '0.0.0.0', () => {
    console.info(`OctoFit API listening at ${baseUrl}`)
  })
}
