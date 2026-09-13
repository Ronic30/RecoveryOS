import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from './db.js'
import User from './models/User.js'
import RecoveryLog from './models/RecoveryLog.js'
import { authenticateToken, JWT_SECRET } from './middleware/auth.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// --- AUTH ROUTES ---

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if user exists
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user in MongoDB
    const userDoc = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash
    })

    const userPayload = {
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email
    }

    // Generate JWT token
    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({ user: userPayload, token })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error during registration' })
  }
})

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const userDoc = await User.findOne({ email: normalizedEmail })

    if (!userDoc) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const validPassword = await bcrypt.compare(password, userDoc.passwordHash)
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const userPayload = {
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email
    }

    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '7d' })

    res.json({ user: userPayload, token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error during login' })
  }
})

// Get Current User Profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const userDoc = await User.findById(req.user.id).select('-passwordHash')
    if (!userDoc) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({
      user: {
        id: userDoc._id.toString(),
        name: userDoc.name,
        email: userDoc.email,
        createdAt: userDoc.createdAt
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' })
  }
})

// --- RECOVERY LOGS ROUTES (MongoDB User-Scoped) ---

// Fetch all logs for logged-in user
app.get('/api/logs', authenticateToken, async (req, res) => {
  try {
    const logs = await RecoveryLog.find({ userId: req.user.id }).sort({ date: -1 })

    const formatted = logs.map(l => ({
      date: l.date,
      workoutIntensity: l.workoutIntensity,
      sleepHours: l.sleepHours,
      sleepQuality: l.sleepQuality,
      sorenessLevel: l.sorenessLevel,
      score: l.score,
      level: l.level,
      recommendation: l.recommendation,
      reason: l.reason
    }))

    res.json(formatted)
  } catch (error) {
    console.error('Fetch logs error:', error)
    res.status(500).json({ error: 'Failed to retrieve recovery logs' })
  }
})

// Create or update log entry for logged-in user
app.post('/api/logs', authenticateToken, async (req, res) => {
  try {
    const {
      date,
      workoutIntensity,
      sleepHours,
      sleepQuality,
      sorenessLevel,
      score,
      level,
      recommendation,
      reason
    } = req.body

    if (!date || score === undefined) {
      return res.status(400).json({ error: 'Missing required log data' })
    }

    const updatedLog = await RecoveryLog.findOneAndUpdate(
      { userId: req.user.id, date },
      {
        workoutIntensity,
        sleepHours,
        sleepQuality,
        sorenessLevel,
        score,
        level,
        recommendation,
        reason
      },
      { upsert: true, new: true, runValidators: true }
    )

    const responseLog = {
      date: updatedLog.date,
      workoutIntensity: updatedLog.workoutIntensity,
      sleepHours: updatedLog.sleepHours,
      sleepQuality: updatedLog.sleepQuality,
      sorenessLevel: updatedLog.sorenessLevel,
      score: updatedLog.score,
      level: updatedLog.level,
      recommendation: updatedLog.recommendation,
      reason: updatedLog.reason
    }

    res.json(responseLog)
  } catch (error) {
    console.error('Save log error:', error)
    res.status(500).json({ error: error.message || 'Failed to save recovery log' })
  }
})

// Delete log entry for logged-in user
app.delete('/api/logs/:date', authenticateToken, async (req, res) => {
  try {
    const { date } = req.params
    await RecoveryLog.deleteOne({ userId: req.user.id, date })
    res.json({ success: true, date })
  } catch (error) {
    console.error('Delete log error:', error)
    res.status(500).json({ error: 'Failed to delete recovery log' })
  }
})

app.listen(PORT, () => {
  console.log(`RecoveryOS MongoDB Server running on http://localhost:${PORT}`)
})
