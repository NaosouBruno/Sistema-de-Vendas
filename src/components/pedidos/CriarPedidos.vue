<template>
<v-main class="text-xs-center">
    <v-container>
      <v-row class="caixa">
        <v-col cols="4">
          <v-select
            v-model="selecionado"
            label="Categorias"
            :items="categorias"
            item-value="id"
            item-text="name"
            outlined
            
            @input="filtrandoCategoria"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Pesquisa"
            v-model="produtoPesquisado"
            @keyup.enter="buscaProduto($event.target.value)"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn
            color="primary"
            elevation="24"
            outlined
            class="mr-2"
            @click="btnBusca(produtoPesquisado)"
          >
            Pesquisar
          </v-btn>
          <v-btn @click="removerFiltro"> Remover Filtro </v-btn>
        </v-col>
      </v-row>
      <v-row class="caixa">
        <v-col cols="3">
          <v-list>
            <h3 class="titulos">Produtos Disponveis</h3>
            <v-list-item
              v-for="produto in produtos"
              :key="produto.name"
              id="exibirProdutos"
            >
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="pink"
                
                @click="criandoPedido(produto.id)"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
              {{ produto.name }}
              | {{ produto.categoria.name }}
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="3">
          <v-list>
            <v-icon color="grey lighten-1"> mdi-cart </v-icon>
            <v-list-item
              v-for="item in carrinho"
              :key="item.name"
              id="carrinho"
            >
              {{ item.produto.name }}

              <v-btn @click="removerProdutoCarrinho(item.id)">Excluir</v-btn>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="3">
          <v-list-item v-for="pedido in pedidos" :key="pedido.id">
            {{ pedido.produto.name }}
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="meio">
          <template v-if="this.carrinho.length > 0">
            <v-btn
              class="ml-8"
              color="primary"
              elevation="24"
              outlined
              @click="dialog = true"
            >
              Concluir
            </v-btn>

            <v-btn class="ml-8" dark color="secondary" @click="cancelaPedido()">
              Cancelar
            </v-btn>
          </template>
          <v-btn
            v-else
            class="ma-2"
            color="red darken-2"
            dark
            large
            @click="voltarTelaPedido"
           
          >
            <v-icon dark left x-large> mdi-arrow-left </v-icon>Voltar
          </v-btn>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="text-h5"> Realizando Pedido </v-card-title>

              <v-card-text>Tem certeza que deseja salvar?</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green" text @click="dialog = false">
                  Não aceito
                </v-btn>

                <v-btn color="green" text @click="concluirPedido">
                  Aceito
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
//import axios from "axios";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "Criar-Pedidos",
  data() {
    return {
      categorias: [],
      produtos: [],
      produtoPesquisado: "",
      novoPedido: {},
      idPedido: null,
      carrinho: [],
      pedidos: [],
      produtoAdicionado: [ ],
      selecionado: "",
      dialog: false,
      desativado: false,
    };
  },
  async created() {
    await this.carregandoCategorias();

    await this.carregandoProdutosComCategorias();

    this.setIdPedido(this.$route.query.idPedido);
    this.produtosCarrinho();
  },
  watch: {
    "$route.query.idPedido"(newPedido) {
      console.log(newPedido);
      this.setIdPedido(newPedido);
    },
  },

  methods: {
    ...mapActions([
      "buscarProduto",
      "cancelarPedido",
      "adicionarProduto",
      "buscarPedidoPorId",
      "criarPedido",
      "filtrarCategoria",
      "carregarCategorias",
      "carregarProdutosComCategoria",
      "filtrar",
      "pegarProdutosCarrinhos",
      "excluirProdutoCarrinho",
    ]),
    ...mapMutations(["setNameListagemProdutos"]),

    async setIdPedido() {
      this.idPedido = this.$route.query.idPedido;
    },

    async carregandoCategorias() {
      this.categorias = await this.carregarCategorias();
    },

    async carregandoProdutosComCategorias() {
      this.produtos = await this.carregarProdutosComCategoria();
    },

    async buscaProduto(name) {
      this.setNameListagemProdutos(name.toLowerCase());
      this.produtos = await this.buscarProduto();

      console.log(this.produtos);
    },

    async btnBusca(name) {
      this.setNameListagemProdutos(name.toLowerCase());
      this.produtos = await this.buscarProduto();
      console.log(this.produtoPesquisado);
    },

    async filtrandoCategoria() {
      console.log("Selecionado: ", this.selecionado);
      this.produtos = await this.filtrarCategoria(this.selecionado);
    },
    async criandoPedido(idProduto) {
      if (this.idPedido) {
        this.novoPedido = await this.buscarPedidoPorId(this.idPedido);
      } else {
        this.novoPedido = await this.criarPedido();
        this.$router.replace({
          name: "Criar-Pedidos",
          query: { idPedido: this.novoPedido.id },
        });
      }
      this.addProduto(idProduto);
    },

    async addProduto(idProduto) {
      const payload = { idPedido: this.novoPedido.id, idProduto: idProduto };
      this.produtoAdicionado = idProduto.toString()
      console.log("aaaa", this.produtoAdicionado)
     /*  for(const i; this.produtoAdicionado.length; i++){
        console.log("Nome do produto: ", this.produtoAdicionado[i])
        utilizar while(condição for verdade executa tudo desse função){
          ai quando clicar no botao cancelar ou voltar alterar o valor da condição quebrando o loop
          
        }
      } */
      
      await this.adicionarProduto(payload);
      await this.produtosCarrinho();
    },
    async verificarSeProdutoExisteNoCarrinho(){
      this.carrinho.find(this.idPedido)
    },

    async produtosCarrinho() {
      if (this.idPedido) {
        this.carrinho = await this.pegarProdutosCarrinhos(this.idPedido);
      }
      console.log("Carrinho: ", this.carrinho.length);
    },

    async cancelaPedido() {
      if (this.idPedido) {
        this.novoPedido = this.cancelarPedido(this.idPedido);
        this.$router.push({ name: "Pedido" });
      } else {
        this.$router.push({ name: "Pedido" });
      }
    },
    concluirPedido() {
      this.$router.push({ name: "Pedido" });
    },
    async removerFiltro() {
      this.selecionado = "";
      this.produtoPesquisado = "";
      this.produtos = await this.carregarProdutosComCategoria();
      console.log(this.produtos);
    },
    async removerProdutoCarrinho(idProdutoPedido) {
      console.log("Id produto remover: ", idProdutoPedido);

      await this.excluirProdutoCarrinho(idProdutoPedido);
      this.pedidos = this.produtosCarrinho();
    },
    voltarTelaPedido(){
      if(this.idPedido == undefined){
        this.$router.push({ name: "Pedido" });
      }
      else{
        this.novoPedido = this.cancelarPedido(this.idPedido);
        this.$router.push({ name: "Pedido" });
      }
    }
  },
};
</script>

<style>
.meio {
  margin-left: 220px;
  width: 15em;
}
</style>