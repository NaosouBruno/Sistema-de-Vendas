<template>
  <v-main class="textoPedidoAcessado">
    <div>
      <h3>Status: {{ pedido.status }}</h3>
      <h3>Id: {{ pedido.id }}</h3>
      <template v-if="pedido.status === 'PENDENTE'">
        <v-btn color="secondary" @click="irAdicionarProduto(pedido.id)"
          >Adicionar Produto</v-btn
        >
      </template>
      <h1>Total: R${{ calcularTotal }}</h1>
    </div>

    <v-data-table
      dense
      :headers="headers"
      :items="produtos"
      item-key="produto.id"
      class="elevation-1"
    >
      <template #[`item.name`]="{ item }">{{ item.produto.name }} </template>
      <template #[`item.valorUnitario`]="{ item }"
        >{{ item.produto.valorUnitario | filtroSimboloReal }}
      </template>
      <template
        #[`item.acessar`]="{ item }"
        v-if="pedido.status === 'PENDENTE'"
      >
        <v-btn
          class="ma-2 "
         
          @click="excluir(item.id)"
        >
          Remover
          <v-icon dark right> mdi-cancel </v-icon>
        </v-btn>
      </template>
      <template #[`item.acessar`]="{ item }" v-else>
        <v-btn
          class="ma-2 "
          
          @click="exibirAlerta(item)"
        >
          Remover
          <v-icon dark right> mdi-cancel </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-btn class="ma-2"  large to="/pedido">
      <v-icon dark left x-large> mdi-arrow-left </v-icon>Voltar
    </v-btn>
  </v-main>
</template>

<script>
import axios from "axios";

import { mapActions } from "vuex";
export default {
  name: "Pedido-Acessado",
  data() {
    return {
      pedido: [],
      produtos: [],
      total: 0,
      headers: [
        {
          text: "Nome",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Valor Unitario", value: "valorUnitario" },
        { text: "Remover", value: "acessar" },
      ],
    };
  },
  computed: {
    calcularTotal() {
      return this.produtos.reduce(
        (sum, { produto }) => sum + produto.valorUnitario,
        0
      );
    },
  },
  async created() {
    await this.carregarPedido(this.$route.params.id);
  },
  methods: {
    ...mapActions(["carregarPedidoPeloId", "excluirProdutoCarrinho"]),

    async carregarPedido(id) {
      this.produtos = await this.carregarPedidoPeloId(id);
      console.log("Produtos :", this.produtos);
      const pedidos = await axios.get(
        `http://localhost:3000/pedidos/${this.$route.params.id}`
      );
      this.pedido = pedidos.data;
      console.log("Pedido: ", this.pedido);
    },
    async excluir(id) {
      if (this.produtos.length < 2) {
        alert("Pedido não pode ficar vazio", id);
      } else {
        console.log("entrou else", this.produtos.length);
        console.log("ID: " + id);
        await this.excluirProdutoCarrinho(id);

        console.log("Excluir", this.produtos.length);
        const { data } = await axios.get(
          `http://localhost:3000/pedidoProdutos?pedidoId=${this.$route.params.id}&_expand=produto`
        );

        this.produtos = data;
      }
    },

    exibirAlerta() {
      alert("Não é possível remover o produto, pois o pedido está PAGO");
    },
    async irAdicionarProduto(id) {
      console.log("Id: ");
      this.$router.push({ name: "Criar-Pedidos", query: { idPedido: id } });
    },
    getNameProduto(prod) {
      console.log("Get name: ", prod);
      return prod.produtos;
    },
  },
};
</script>

<style>
</style>