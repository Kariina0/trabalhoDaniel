import { Produto } from '../../models/produto.js'

export async function list(req, res) {
  try {
    const produtos = await Produto.find().populate('marcaId').lean()
    res.status(200).send({ message: 'Dados consultados com sucesso.', data: produtos, error: false })
  } catch (error) {
    res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
  }
}

export async function listById(req, res) {
  try {
    const { id } = req.params
    const produto = await Produto.findById(id).populate('marcaId').lean()
    return res.status(200).send({ message: 'Dados consultados com sucesso.', data: produto || {}, error: false })
  } catch (error) {
    res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
  }
}

export async function create(req, res) {
  try {
    const { nome, preco, estoque, marcaId } = req.body
    const created = await Produto.create({ nome, preco, estoque, marcaId })
    res.status(201).send({ message: 'Criado com sucesso.', data: created, error: false })
  } catch (error) {
    res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params
    const { nome, preco, estoque, marcaId } = req.body
    const updated = await Produto.findByIdAndUpdate(id, { $set: { nome, preco, estoque, marcaId } }, { new: true }).lean()
    res.status(200).send({ message: 'Atualizado com sucesso.', data: updated, error: false })
  } catch (error) {
    res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params
    await Produto.findByIdAndDelete(id)
    res.status(200).send({ message: 'Excluído com sucesso.', data: {}, error: false })
  } catch (error) {
    res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
  }
}
