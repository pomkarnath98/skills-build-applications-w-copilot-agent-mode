import mongoose from 'mongoose'

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

export async function connectDatabase() {
  await mongoose.connect(connectionString)
  console.info('Connected to octofit_db')
}
