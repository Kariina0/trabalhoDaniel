import { Marca } from '../../models/marca.js'

export async function list(req, res) {
    try {
        const marcas = await Marca.find().lean()
        res.status(200).send({ message: 'Dados consultados com sucesso.', data: marcas, error: false })
    } catch (error) {
        res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
    }
}

export async function listById(req, res) {
    try {
        const { id } = req.params
        const marca = await Marca.findById(id).lean()
        return res.status(200).send({ message: 'Dados consultados com sucesso.', data: marca || {}, error: false })
    } catch (error) {
        res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
    }
}

export async function create(req, res) {
    try {
        const { nome, site, telefone } = req.body
        const created = await Marca.create({ nome, site, telefone })
        res.status(201).send({ message: 'Criado com sucesso.', data: created, error: false })
    } catch (error) {
        res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params
        const { nome, site, telefone } = req.body
        const updated = await Marca.findByIdAndUpdate(id, { $set: { nome, site, telefone } }, { new: true }).lean()
        res.status(200).send({ message: 'Atualizado com sucesso.', data: updated, error: false })
    } catch (error) {
        res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
    }
}

export async function remove(req, res) {
    try {
        const { id } = req.params
        await Marca.findByIdAndDelete(id)
        res.status(200).send({ message: 'Excluído com sucesso.', data: {}, error: false })
    } catch (error) {
        res.status(500).send({ message: 'Erro no servidor.', data: '', error: true })
    }
}