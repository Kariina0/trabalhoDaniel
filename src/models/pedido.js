import mongoose from 'mongoose'

const PedidoItemSchema = new mongoose.Schema(
  {
    produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true, min: 1 },
    precoUnitario: { type: Number, required: true },
  },
  { _id: false }
)

const PedidoSchema = new mongoose.Schema(
  {
    numero: { type: String, required: true, unique: true },
    clienteNome: { type: String, required: true },
    itens: { type: [PedidoItemSchema], default: [] },
    total: { type: Number, required: true },
    status: { type: String, enum: ['aberto', 'pago', 'cancelado'], default: 'aberto' },
  },
  { timestamps: true }
)

export const Pedido = mongoose.models.Pedido || mongoose.model('Pedido', PedidoSchema)
