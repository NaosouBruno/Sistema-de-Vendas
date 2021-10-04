import axios from 'axios'
export default class {
  async filtrar(selecionado) {
    return await axios.get(`http://localhost:3000/produtos?_expand=categoria${selecionado}`);
  }
  async cancelarPedido(idPedido) {
    return await axios.delete("http://localhost:3000/pedidos/" + idPedido);
  }
  async buscarPedidoPorId(idPedido) {
    return await axios.get(
      "http://localhost:3000/pedidos/" + idPedido
    );
  }

  async criarPedido() {
    return await axios.post("http://localhost:3000/pedidos", {
      status: "PENDENTE",
    });
  }

  async confirmarCompraPedido(id) {
    return await axios.patch(`http://localhost:3000/pedidos/${id}`, {
      status: "PAGO",
    });
  }
  async cancelarCompraPedido(id) {
    return await axios.patch(`http://localhost:3000/pedidos/${id}`, {
      status: "PENDENTE",
    });
  }

  async alterarEstadoDaCompra(pedidos, data) {
    const aux = pedidos.find(pedido => pedido.id === data.id)
    if (aux) {
      aux.status = 'PAGO'
    }
  }



  /******************************  FUNÇÕES NO CREATE ****************************** */
  
 
}
