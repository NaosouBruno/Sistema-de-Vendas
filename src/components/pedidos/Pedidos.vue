<template>
  <v-main>
    <v-btn to="criar-pedido" class="ml-4 mb-2 botao"> Novo Pedido </v-btn>

    <v-data-table
      dense
      :headers="headers"
      :items="pedidos"
      item-key="pedido"
      class="elevation-1 tabela"
    >
      <template #[`item.id`]="{ item }"
        >{{ getIdPedido(item.produtos) }}
      </template>
      <template #[`item.status`]="{ item }"
        >{{ getStatusPedido(item.produtos[0]) }}
      </template>
      <template #[`item.total`]="{ item }"
        >{{ calcularTotalPedido(item.produtos) | filtroSimboloReal }}
      </template>
      <template #[`item.quantidade`]="{ item }"
        >{{ item.produtos.length }}
      </template>
      <template #[`item.acessar`]="{ item }"
        ><v-btn color="primary" @click="acessarPedido(item.pedido)">
          Acessar</v-btn
        >
      </template>
      <template #[`item.evento`]="{ item }">
        <v-btn
          class="botao"
          v-if="getStatusPedido(item.produtos[0]) === 'PENDENTE'"
          color="secondary"
          elevation="24"
          @click="confirmarCompra(item.pedido)"
        >
          Comprar
        </v-btn>
        <v-btn
          class="botaoExcluir"
          v-else
          color="warning"
          elevation="24"
          @click="cancelarCompra(item.pedido)"
        >
          Cancelar
        </v-btn>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "Pedido",
  data() {
    return {
      pedidos: [],
      pedidoCarregado: [],

      default: "ABERTO",
      estado: true,

      headers: [
        {
          text: "Pedidos ( id )",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Total", value: "total" },
        { text: "Status", value: "status" },
        { text: "Quantidade de produtos", value: "quantidade" },
        { text: "Ações", value: "acessar" },
        { text: "Comprar/Cancelar", value: "evento" },
      ],
    };
  },
  async created() {
    await this.carregarPedidosEPedProdutos();
  },
  methods: {
    ...mapActions([
      "filtrar",
      "carregarPedidosEPedidosProdutos",
      "confirmarCompraPedido",
      "cancelarCompraPedido",
    ]),
    async carregarPedidosEPedProdutos() {
      const listarPedidos = await this.carregarPedidosEPedidosProdutos();
      this.agruparPedidos(listarPedidos);
    },
    agruparPedidos(pedidos) {
      console.log(pedidos);
      this.pedidos = _(pedidos)
        .groupBy((x) => x.pedido.id)
        .map((value, key) => ({ pedido: key, produtos: value }))
        .value();
    },

    async acessarPedido(id) {
      console.log(id);
      this.$router.push({ name: "Pedido-Acessado", params: { id: id } });
    },

    async confirmarCompra(id) {
      console.log("Id confirmar compra: ", id);
      const data = await this.confirmarCompraPedido(id);
      const pedidoAtual = this.pedidos.find((pedido) => pedido.pedido === id);
      console.log(pedidoAtual);
      pedidoAtual.produtos[0].pedido.status = data.status;
      console.log("Confirmar compra: ", this.pedidos);
    },
    async cancelarCompra(id) {
      console.log("Id cancelar compra: ", id);
      const data = await this.cancelarCompraPedido(id);
      const pedidoAtual = this.pedidos.find((pedido) => pedido.pedido === id);
      console.log("Pedido Atual ", pedidoAtual);
      pedidoAtual.produtos[0].pedido.status = data.status;
      console.log("Cancelar compra: ", this.pedidos);
    },

    calcularTotalPedido(produtos) {
      return produtos.reduce(
        (sum, { produto }) => sum + produto.valorUnitario,
        0
      );
    },
    getStatusPedido(produto) {
      console.log(produto);
      return produto.pedido.status;
    },
    getIdPedido(produtos) {
      return produtos[0].pedido.id;
    },
  },
};
</script>

<style>
</style>