import 'dotenv/config'
import mongoose from 'mongoose'

export const conexaoMongo = async () => {
  const uri = process.env.MONGO_URL + process.env.MONGO_DATABASE
  await mongoose.connect(uri)
  console.log('Conectado ao MongoDB')
}
