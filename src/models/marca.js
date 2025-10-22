import mongoose from 'mongoose'

const MarcaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    site: { type: String },
    telefone: { type: String },
  },
  { timestamps: true }
)

export const Marca = mongoose.models.Marca || mongoose.model('Marca', MarcaSchema)
