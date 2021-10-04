import axios from 'axios'
export default class {

  async editarProduto(editado) {
    return await axios.put("http://localhost:3000/produtos/" + editado.id, {
      name: editado.name,
      descricao: editado.descricao,
      valorUnitario: editado.valorUnitario,
      categoriaId: editado.categoriaId,
    })
  }
  async criarProduto(produto) {
    return await axios.post("http://localhost:3000/produtos", {
      name: produto.name,
      descricao: produto.descricao,
      valorUnitario: produto.valorUnitario,
      categoriaId: produto.categoriaId,
    });

  }

  async filtrarCategoria(categoriaId) {
    return await axios.get(`http://localhost:3000/produtos?categoriaId=${categoriaId}&_expand=categoria`)
  }

  async buscarProduto(name) {
    return await axios.get(`http://localhost:3000/produtos?_expand=categoria${name ? '&name_like=' + name : ''}`);
  }

  async excluirProduto(idProduto) {
    return await axios.delete("http://localhost:3000/produtos/" + idProduto);
  }

  /******************************  FUNÇÕES NO CREATE ****************************** */
  /* CREATE DA TELA PEDIDOS */
  async carregarProdutoParaEdicao(id) {
    return await axios.get(
      `http://localhost:3000/produtos/${id}?_expand=categoria`
    );
  }
  async carregarProdutosComCategoria() {

    return await axios.get("http://localhost:3000/produtos?_expand=categoria")
  }
}