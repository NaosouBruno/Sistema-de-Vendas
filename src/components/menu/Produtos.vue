<template>
  <v-main>
    <v-btn to="cadastro" > Adicionar Produto </v-btn>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            label="Pesquisar Produto"
            @keyup.enter="buscaProduto($event.target.value)"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <template>
      <v-card>
        <v-data-table :headers="headers" :items="produtos">
          <template #[`item.valorUnitario`]="{ item }"
            >{{ item.valorUnitario | filtroSimboloReal | trocarVirgulaPorPonto}}
          </template>
          <template #[`item.categoria`]="{ item }"
            >{{ item.categoria.name }}
          </template>
          <template #[`item.acao`]="{ item }">
            <v-btn
              class="botao"
              color="primary"
              @click="acessarProduto(item.id)"
              >Acessar
            </v-btn>
          </template>
          <template #[`item.excluir`]="{ item }">
            <v-btn
              class="botaoExcluir"
              color="warning"
              @click="apagarProduto(item.id)"
              >Excluir
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </v-main>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "Produtos",


  data() {
    return {
      produtoBuscado: "",
      produtos: [],
      encontrou: false,

      headers: [
        {
          text: "ID",
          align: "start",
          filterable: false,
          value: "id",
        },

        { text: "Nome", value: "name" },
        { text: "Valor", value: "valorUnitario" },
        { text: "Categoria", value: "categoria" },
        { text: "Ações", value: "acao" },
        { text: "Excluir", value: "excluir" },
      ],
    };
  },
  async created() {
    await this.carregandoProdutoComCategorias();
  },
  methods: {
    ...mapActions([
      //nome que ta na store
      "buscarProduto",
      "carregarProdutosComCategoria",
      "excluirProduto",
    ]),
    ...mapMutations(["setNameListagemProdutos"]),

    async carregandoProdutoComCategorias() {
      this.produtos = await this.carregarProdutosComCategoria();
      console.log("Produtos ", this.produtos);
    },

    async buscaProduto(name) {
      this.setNameListagemProdutos(name.toLowerCase());
      this.produtos = await this.buscarProduto();
      console.log(this.produtos);
    },
    acessarProduto(id) {
      this.$router.push({ name: "Produto-Acessado", params: { id: id } });
    },
    async apagarProduto(id) {
      console.log("ID: " + id);
      await this.excluirProduto(id);
      console.log("Excluir", this.produtos.length);
      this.produtos = await this.carregarProdutosComCategoria();
    },
  },
};
</script>

<style>

</style>