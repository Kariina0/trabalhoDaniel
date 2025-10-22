import { list as listMarcas, listById as listMarcaById, create as createMarca, update as updateMarca, remove as removeMarca } from '../controllers/marcas.js'
import { list as listProdutos, listById as listProdutoById, create as createProduto, update as updateProduto, remove as removeProduto } from '../controllers/produtos.js'
import { list as listPedidos, listById as listPedidoById, create as createPedido, update as updatePedido, remove as removePedido } from '../controllers/pedidos.js'
import { syncAll } from '../../services/mysql/sync-mongo-to-mysql.js'

export const routes = async(app) => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "API Ok."})
    })
    // Marcas
    app.get('/marcas', listMarcas)
    app.get('/marcas/:id', listMarcaById)
    app.post('/marcas', createMarca)
    app.put('/marcas/:id', updateMarca)
    app.delete('/marcas/:id', removeMarca)

    // Produtos
    app.get('/produtos', listProdutos)
    app.get('/produtos/:id', listProdutoById)
    app.post('/produtos', createProduto)
    app.put('/produtos/:id', updateProduto)
    app.delete('/produtos/:id', removeProduto)

    // Pedidos
    app.get('/pedidos', listPedidos)
    app.get('/pedidos/:id', listPedidoById)
    app.post('/pedidos', createPedido)
    app.put('/pedidos/:id', updatePedido)
    app.delete('/pedidos/:id', removePedido)

    // Sincronização Mongo -> MySQL
    app.post('/sync', async (req, res) => {
        const result = await syncAll()
        return res.status(200).send(result)
    })
}