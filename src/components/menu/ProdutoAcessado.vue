<template>
  <v-main class="textoProdutoAcessado">
    <div >
      <h3 class="font-weight-bold">Id: {{ produto.id }}</h3>
      <h3>Nome do produto: {{ produto.name }}</h3>
      <h3>Descrição: {{ produto.descricao }}</h3>
      <h3>Valor unitario: {{ produto.valorUnitario }}</h3>
      <h3>Categoria: {{ produto.categoria.name }}</h3>
    </div>
    
   
    <div>
      <v-btn large @click="irEditar(produto.id)"> Editar Produto </v-btn>
      <v-btn class="ma-2" color="red darken-2" dark large to="/produtos">
        <v-icon dark left x-large> mdi-arrow-left </v-icon>Voltar
      </v-btn>
    </div>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      produto: {
        name: "",
        descricao: "",
        valorUnitario: null,
        categoria: {},
      },
      executando: false,
      editar: false,
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
      ],
    };
  },
  name: "Produto-Acessado",
  async created() {
    // route = component
    // router = global

    const res = await axios.get(
      `http://localhost:3000/produtos/${this.$route.params.id}?_expand=categoria`
    );
    this.produto = res.data;
    console.log(this.produto);
  },

  methods: {
    irEditar(id) {
      this.$router.push({ name: "Editar-Produto", params: { id: id } });
    },
  },
};
</script>

<style>

</style>