import mongoose from 'mongoose'

const recoveryLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: String, // e.g. "2026-09-13"
      required: true,
    },
    workoutIntensity: {
      type: Number,
      required: true,
    },
    sleepHours: {
      type: Number,
      required: true,
    },
    sleepQuality: {
      type: Number,
      required: true,
    },
    sorenessLevel: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      default: 'MODERATE',
    },
    recommendation: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Ensure each user has only one recovery log entry per calendar date
recoveryLogSchema.index({ userId: 1, date: 1 }, { unique: true })

export default mongoose.model('RecoveryLog', recoveryLogSchema)
