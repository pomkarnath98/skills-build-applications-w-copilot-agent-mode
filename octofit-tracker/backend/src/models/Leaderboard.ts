import { model, Schema } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, min: 0, required: true, default: 0 },
    period: { type: String, required: true, default: 'all-time' },
  },
  { timestamps: true },
)

export default model('Leaderboard', leaderboardSchema)
