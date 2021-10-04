import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/inicial/Index.vue'
import Produtos from '../components/menu/Produtos.vue'
import Cadastro from '../components/menu/CadastrarProduto.vue'
import ProdutoAcessado from '../components/menu/ProdutoAcessado.vue'
import EditarProduto from '../components/menu/EditarProduto.vue'

import Pedido from '../components/pedidos/Pedidos.vue'
import PedidoAcessado from '../components/pedidos/PedidoAcessado.vue'
import CriarPedidos from '../components/pedidos/CriarPedidos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/produtos',
    name: 'listarProdutos',
		component: Produtos
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/cadastro',
    name: 'Cadastrar Produtos',
    component: Cadastro
  },
  {
    path: '/produto-acessado/:id',
    name: 'Produto-Acessado',
    component: ProdutoAcessado
  },

  {
    path: '/editar-produuto/:id',
    name: 'Editar-Produto',
    component: EditarProduto
  },
  {
    path: '/pedido',
    name: 'Pedido',
    component: Pedido
  },
  {
    path: '/pedido-acessado/:id',
    name: 'Pedido-Acessado',
    component: PedidoAcessado
  },
  {
    path: '/criar-pedido/',
    name: 'Criar-Pedidos',
    component: CriarPedidos
  }
]

const router = new VueRouter({
  routes
})

export default router
