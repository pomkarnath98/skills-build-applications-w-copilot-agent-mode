import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, trim: true },
  },
  { timestamps: true },
)

export default model('User', userSchema)
