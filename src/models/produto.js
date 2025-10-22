import mongoose from 'mongoose'

const ProdutoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    estoque: { type: Number, required: true },
    marcaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Marca', required: true },
  },
  { timestamps: true }
)

export const Produto = mongoose.models.Produto || mongoose.model('Produto', ProdutoSchema)
