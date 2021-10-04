<template>
  <v-main>
    <h1>Cadastrar Produto</h1>
    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="produto.name"
              label="Nome do Produto"
              required
              v-validate="'required'"
              name="Nome do Produto"
              :error-messages="errors.collect('Nome do Produto')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="produto.descricao"
              label="Descrição do Produto"
              required
              v-validate="'required'"
              name="Descrição do Produto"
              :error-messages="errors.collect('Descrição do Produto')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model.number="produto.valorUnitario"
              label="Valor do Produto"
              required
              prefix="R$"
              type="number"
              v-validate="'required'"
              name="Valor do Produto"
              :error-messages="errors.collect('Valor do Produto')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-select
              label="Selecione a categoria"
              v-validate="'required'"
              :items="categorias"
              item-value="id"
              item-text="name"
              
              v-model="produto.categoriaId"
              name="Selecione a categoria"
              :error-messages="errors.collect('Selecione a categoria')"
            ></v-select>
          </v-col>
        </v-row>
        <v-btn large @click="validate"> Cadastrar </v-btn>
        <v-btn class="ma-2" color="red darken-2" dark large to="/produtos">
          Voltar
        </v-btn>
      </v-container>
    </v-form>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Cadastro de produtos </v-card-title>

        <v-card-text>Tem certeza que deseja salvar?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green" text @click="dialog = false"> Não aceito </v-btn>

          <v-btn color="green" text @click="criandoProduto()"> Aceito </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CadastrarProduto",
  inject: ["$validator"],
  data() {
    return {
      produto: {
        name: "",
        descricao: "",
        valorUnitario: null,
        categoriaId: "",
      },
      categorias: [],
      dialog: false,
      selecionado: "",
    };
  },

  async created() {
    await this.carregandoCategorias();
  },
  methods: {
    ...mapActions(["criarProduto", "carregarCategorias"]),
    async carregandoCategorias() {
      this.categorias = await this.carregarCategorias();
    },
    limparCampos() {
      (this.produto.name = ""),
        (this.produto.descricao = ""),
        (this.produto.valorUnitario = null),
        (this.produto.categoriaId = "");
    },

    async criandoProduto() {
      console.log(this.$store);
      this.produto = await this.criarProduto(this.produto);
      this.dialog = false;

      this.$router.push({ name: "listarProdutos" });
    },

    async validate() {
      await this.$validator._base.validateAll();
      if (!this.errors.any()) {
        this.dialog = true;
      }
    },
  },
};
</script>

<style>
</style>