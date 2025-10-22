import { Pedido } from '../../models/pedido.js'

export async function list(req, res) {
  try {
    const pedidos = await Pedido.find().lean()
    res.status(200).send({ message: 'Dados consultados com sucesso.', data: pedidos, error: false })
  } catch (error) {
    res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
  }
}

export async function listById(req, res) {
  try {
    const { id } = req.params
    const pedido = await Pedido.findById(id).lean()
    return res.status(200).send({ message: 'Dados consultados com sucesso.', data: pedido || {}, error: false })
  } catch (error) {
    res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
  }
}

export async function create(req, res) {
  try {
    const { numero, clienteNome, itens, total, status } = req.body
    const created = await Pedido.create({ numero, clienteNome, itens, total, status })
    res.status(201).send({ message: 'Criado com sucesso.', data: created, error: false })
  } catch (error) {
    res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params
    const { numero, clienteNome, itens, total, status } = req.body
    const updated = await Pedido.findByIdAndUpdate(id, { $set: { numero, clienteNome, itens, total, status } }, { new: true }).lean()
    res.status(200).send({ message: 'Atualizado com sucesso.', data: updated, error: false })
  } catch (error) {
    res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params
    await Pedido.findByIdAndDelete(id)
    res.status(200).send({ message: 'Excluído com sucesso.', data: {}, error: false })
  } catch (error) {
    res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
  }
}
