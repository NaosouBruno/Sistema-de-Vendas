<template>
  
    <v-form ref="form" class="formulario">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="produtoEditado.name"
              label="Nome do Produto"
              required
              filled
              rounded
              dense
              
              v-validate="'required'"
              name="Nome do Produto"
              :error-messages="errors.collect('Nome do Produto')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="produtoEditado.descricao"
              label="Descrição do Produto"
              required
              filled
              rounded
              dense
              v-validate="'required'"
              name="Descrição do Produto"
              :error-messages="errors.collect('Descrição do Produto')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model.number="produtoEditado.valorUnitario"
              label="Valor do Produto"
              required
              filled
              rounded
              dense
              type="number"
              prefix="R$"
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
              filled
              rounded
              dense
              v-model="produtoEditado.categoriaId"
              name="Selecione a categoria"
              :error-messages="errors.collect('Selecione a categoria')"
            ></v-select>
          </v-col>
        </v-row>
        <v-btn @click="validate"> Finalizar Edição </v-btn>
      </v-container>
    
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Edição de produtos </v-card-title>

        <v-card-text>Tem certeza que deseja salvar?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green" text @click="dialog = false"> Não </v-btn>

          <v-btn color="green" text @click="editaProduto"> Sim </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
 
</template>

<script>
import axios from "axios";

import { mapActions } from "vuex";

export default {
  inject: ["$validator"],
  name: "Editar-produtoEditado",
  data() {
    return {
      produtoEditado: {},
      dialog: false,
      categorias: [],
    };
  },
  async created() {
    await this.carregandoCategorias();
   // await this.carregarProdutoParaEdicao(this.$route.params.id)
    //await this.carregarProduto();
    const res = await axios.get(
      `http://localhost:3000/produtos/${this.$route.params.id}?_expand=categoria`
    );
    this.produtoEditado = res.data 
  },
  methods: {
    ...mapActions([

      "editarProduto",
      "carregarCategorias",
      "carregarProdutoParaEdicao" ,
    ]),
    async carregandoCategorias() {
      this.categorias = await this.carregarCategorias();
    },
   /*   async carregarProduto(){
      this.produtos = await this.carregarProdutoParaEdicao(this.$route.params.id)
    }, */ 
    async editaProduto() {

      console.log(this.$store);
      this.produtoEditado = await this.editarProduto(this.produtoEditado);
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
.formulario {
  
  margin-top: 15%;

}



</style>