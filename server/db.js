import mongoose from 'mongoose'

export async function connectDB() {
  const mongoURI = process.env.MONGODB_URI

  const isPlaceholder = !mongoURI || 
    mongoURI.includes('<username>') || 
    mongoURI.includes('<password>') || 
    mongoURI.includes('example.mongodb.net')

  if (isPlaceholder) {
    console.warn('\n===================================================================')
    console.warn('⚠️ MONGODB ATLAS URI NOT CONFIGURED IN .env FILE')
    console.warn('-------------------------------------------------------------------')
    console.warn('Please open your .env file and set MONGODB_URI to your real')
    console.warn('MongoDB Atlas connection string from https://cloud.mongodb.com.')
    console.warn('Example:')
    console.warn('MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/recoveryos')
    console.warn('===================================================================\n')
  }

  const uriToConnect = !isPlaceholder 
    ? mongoURI 
    : 'mongodb://127.0.0.1:27017/recoveryos'

  try {
    console.log(`Connecting to MongoDB at ${isPlaceholder ? 'mongodb://127.0.0.1:27017/recoveryos' : 'MongoDB Atlas'}...`)
    await mongoose.connect(uriToConnect)
    console.log(`✅ Connected to MongoDB successfully (${mongoose.connection.host})`)
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message)
    if (isPlaceholder) {
      console.error('\n👉 ACTION REQUIRED:')
      console.error('1. Go to https://cloud.mongodb.com and create/copy your Cluster Connection String.')
      console.error('2. Paste your connection string into the .env file in your project folder.')
      console.error('3. Make sure to replace <username> and <password> with your database user credentials.')
      console.error('4. In MongoDB Atlas, ensure Network Access includes 0.0.0.0/0 (or your current IP).\n')
    }
  }
}
