import { database } from '../../database/index.js'
import { Marca } from '../../models/marca.js'
import { Produto } from '../../models/produto.js'
import { Pedido } from '../../models/pedido.js'

async function upsert(table, uniqueKey, rows) {
  if (!rows.length) return { inserted: 0, updated: 0 }
  await database(table).insert(rows).onConflict(uniqueKey).merge()
  return { inserted: rows.length, updated: 0 }
}

export async function syncMarcas() {
  const docs = await Marca.find().lean()
  const rows = docs.map((d) => ({
    mongo_id: d._id.toString(),
    nome: d.nome || null,
    site: d.site || null,
    telefone: d.telefone || null,
    created_at: d.createdAt ? new Date(d.createdAt) : null,
    updated_at: d.updatedAt ? new Date(d.updatedAt) : null,
  }))
  await upsert('marcas', 'mongo_id', rows)
  return { collection: 'marcas', synced: rows.length }
}

export async function syncProdutos() {
  const docs = await Produto.find().lean()
  const rows = docs.map((d) => ({
    mongo_id: d._id.toString(),
    nome: d.nome,
    preco: d.preco,
    estoque: d.estoque,
    marca_mongo_id: d.marcaId?.toString() || null,
    created_at: d.createdAt ? new Date(d.createdAt) : null,
    updated_at: d.updatedAt ? new Date(d.updatedAt) : null,
  }))
  await upsert('produtos', 'mongo_id', rows)
  return { collection: 'produtos', synced: rows.length }
}

export async function syncPedidos() {
  const docs = await Pedido.find().lean()
  const rows = docs.map((d) => ({
    mongo_id: d._id.toString(),
    numero: d.numero,
    cliente_nome: d.clienteNome,
    total: d.total,
    status: d.status,
    itens_json: JSON.stringify(d.itens || []),
    created_at: d.createdAt ? new Date(d.createdAt) : null,
    updated_at: d.updatedAt ? new Date(d.updatedAt) : null,
  }))
  await upsert('pedidos', 'mongo_id', rows)
  return { collection: 'pedidos', synced: rows.length }
}

export async function syncAll() {
  return {
    message: 'Sincronização concluída',
    results: [await syncMarcas(), await syncProdutos(), await syncPedidos()],
  }
}
