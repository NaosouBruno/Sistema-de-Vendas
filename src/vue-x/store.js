import Vue from 'vue'
import Vuex from 'vuex'

import ServicoProduto from '../servicos/ServicoProduto'
import ServicoPedido from '../servicos/ServicoPedido'
import ServicoCategoria from '@/servicos/ServicoCategoria'
import ServicoPedidoProduto from '../servicos/SerivoPedidoProduto'


// instanciar 
// const não pode alterar o valor 
// let pode alterar 
const servicoProduto = new ServicoProduto()
const servicoPedido = new ServicoPedido()
const servicoCategoria = new ServicoCategoria()
const servicoPedidoProduto = new ServicoPedidoProduto()
Vue.use(Vuex)

export default new Vuex.Store({
	// tudo que está dentro do state vai representar o estado central que é gerenciado pelo VueX
	//
	state:{
		filtroListagemProduto:{
			name: null,
		}
	},
	mutations:{
		// sempre recebe a state como parametro
		// segundo valor é o que quer atualizar
		setNameListagemProdutos(state, name){
			state.filtroListagemProduto.name = name
		}
	},
	actions:{
		// actions recebe 2 parametros empre
		// dispath ou commi, sempre será um desses dois o parametro
		async editarProduto(context,editado){
			// destruction {data}
			// usar o data pois é de onde vem os dados da response
			const {data} = await servicoProduto.editarProduto(editado)
			//meu objeto . nome do atributo na classe
			return data
		},
		async criarProduto(context, produto){
			const {data} = await servicoProduto.criarProduto(produto)
			return data
		},

		async buscarProduto({state}){
			const {name} = state.filtroListagemProduto
			const {data} = await servicoProduto.buscarProduto(name)
			return data
		
		},

		async excluirProduto(context, idProduto){
			const {data} = await servicoProduto.excluirProduto(idProduto)
			return data
		
		},

		async carregarProdutoParaEdicao(context, id){
			const {data} = await servicoProduto.carregarProdutoParaEdicao(id)
			return data
		},


		
		// ACTION PEDIDOS
		async filtrar(context, categoriaId){
			const {data} = await servicoPedido.filtrar(categoriaId)
			return data
		},

		async filtrarCategoria(context, selecionado){
			const {data} = await servicoProduto.filtrarCategoria(selecionado)
			return data
		},

		async cancelarPedido(context, idPedido){
			const {data} = await servicoPedido.cancelarPedido(idPedido)
			return data
		},

		async adicionarProduto(context, {idPedido, idProduto}){
			// data existe
			const {data} = await servicoPedidoProduto.adicionarProduto(idPedido, idProduto)
			return data
		},

		async buscarPedidoPorId(context, idPedido){
			//destruction auxlia alguma propriedade
			const {data} = await servicoPedido.buscarPedidoPorId(idPedido)
			return data
		},
		
		async criarPedido(context, idPedido){
			const {data} = await servicoPedido.criarPedido(idPedido)
			return data
		},

		async confirmarCompraPedido(context, id){
			const {data} = await servicoPedido.confirmarCompraPedido(id)
			return data
		},
		async cancelarCompraPedido(context, id){
			const {data} = await servicoPedido.cancelarCompraPedido(id)
			return data
		},

		
		async pegarProdutosCarrinhos(context, idPedido){
			const {data} = await servicoPedidoProduto.pegarProdutosCarrinhos(idPedido)
			return data
		},

		async excluirProdutoCarrinho(contex,idProdutoPedido){
			const {data} = await servicoPedidoProduto.excluirProdutoCarrinho(idProdutoPedido)
			return data
		},

		/******************************  FUNÇÕES NO CREATE ****************************** */
		
		/* CREATE DA TELA PEDIDOS */
		async carregarPedidosEPedidosProdutos (){
			const {data} = await servicoPedidoProduto.carregarPedidosEPedidosProdutos()
			return data
		},

		/* CREATE DA TELA PEDIDO ACESSADO*/

		async carregarPedidoPeloId(context, id){
			const {data} = await servicoPedidoProduto.carregarPedidoPeloId(id)
			return data
		},

		/* CREATE DA TELA CRIAR PEDIDOS*/

		async carregarCategorias(){
			const {data} = await servicoCategoria.carregarCategorias()
			return data
		},

		async carregarProdutosComCategoria(){
			const {data} = await servicoProduto.carregarProdutosComCategoria()
			return data
		}
	}
})