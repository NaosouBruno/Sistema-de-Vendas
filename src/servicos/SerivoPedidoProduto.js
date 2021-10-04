import axios from 'axios'
export default class {
  async adicionarProduto(idPedido, idProduto) {

    return await axios.post("http://localhost:3000/pedidoProdutos", {
      pedidoId: idPedido,
      produtoId: idProduto
    })
  }
  async verificarProdutoNoPedido(idPedido, idProduto) {
    return await axios.get(`http://localhost:3000/pedidoProdutos/?pedidoId=${idPedido}&produtoId=${idProduto}`)
  }
  async pegarProdutosCarrinhos(idPedido) {
    return await axios.get(
      "http://localhost:3000/pedidoProdutos/?_expand=produto&pedidoId=" +
      idPedido
    );
  }
  async excluirProdutoCarrinho(idProdutoPedido) {
    return await axios.delete(`http://localhost:3000/pedidoProdutos/${idProdutoPedido}`)
  }
  /* CREATE DA TELA PEDIDOS */
  async carregarPedidosEPedidosProdutos() {
    return await axios.get("http://localhost:3000/pedidoProdutos/?_expand=produto&_expand=pedido")
  }
  async carregarPedidoPeloId(id) {
    return await axios.get(`http://localhost:3000/pedidoProdutos?pedidoId=${id}&_expand=produto`);
  }
}