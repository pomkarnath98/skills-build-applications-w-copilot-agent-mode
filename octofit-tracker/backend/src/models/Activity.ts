import { model, Schema } from 'mongoose'

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, min: 0, required: true },
    date: { type: Date, default: Date.now },
    points: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
)

export default model('Activity', activitySchema)
