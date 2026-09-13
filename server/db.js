import mongoose from 'mongoose'

// Cache the connection for serverless (Vercel) environments
let cached = global._mongooseConnection

if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null }
}

export async function connectDB() {
  // Return existing connection if already established
  if (cached.conn) {
    return cached.conn
  }

  const mongoURI = process.env.MONGODB_URI

  if (!mongoURI) {
    throw new Error(
      'MONGODB_URI is not defined. Please set it in your Vercel project environment variables at https://vercel.com/dashboard.'
    )
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoURI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB connected (${mongooseInstance.connection.host})`)
        return mongooseInstance
      })
      .catch((err) => {
        cached.promise = null
        console.error('❌ MongoDB connection failed:', err.message)
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}
