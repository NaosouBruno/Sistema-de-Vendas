<template>
  <div>
    <h1 class="index">Seja bem vinda Karen ao seu controle de vendas</h1>
    <br />
    <v-img
      id="imagem"
      position="center "
      src="@/imagens/controle.png"
      style="width: 450px; height: 250px"
    >
      Tenha todo o controle de suas vendas</v-img
    >
    <v-footer
      
      padless
      class="rodape"
      
    >
      <v-card flat tile class="blue-grey darken-3 white--text text-center ">
        <v-card-text>
         <a href="https://www.linkedin.com/in/michael-douglas-silva-ferreira/">
          <v-btn class="mx-4 white--text"
           
            icon>
               <v-icon size="24px">
                 mdi-linkedin
              
            </v-icon>
          </v-btn>
           </a>
         <a href="https://www.linkedin.com/company/az-tecnologia-em-gestao/">
          <v-btn class="mx-4 white--text"
            icon>
               <v-icon size="24px">
                 mdi-linkedin
              
            </v-icon>
          </v-btn>
           </a>
         <a href="https://www.linkedin.com/in/bruno-silva-759603163/">
          <v-btn class="mx-4 white--text"
           
            id="mouseAlt"
            icon>
               <v-icon size="24px">
                 mdi-linkedin
            </v-icon>
          </v-btn>
           </a>
          
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Esse projeto de estagio veio do orientador Michael Douglas da empresa
          AZ Tecnologia que entregou ao estágiario Bruno Silva para testar seus
          conhecimentos. Com muita dificuldade pois esse é meu primeiro projeto
          consegui finalizar, queria ter feito mais e trabalhado num design
          responsivel assim como melhorar o design. Graças a ajuda do meu
          orientador que sempre estava ali para tirar as duvidas que eram
          diarias esse projeto foi concluido. O Vuejs é um incrivel framework e
          vale a pena estuda-lo e esse projeto foi incrivel, adqueri muito
          conhecimento em JavaScript, VueJs, Vuetify, API, Banco de Dados.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>AZ TECNOLOGIA</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
 
};
</script>

<style>

#imagem {
  margin-left: 37%;
  margin-top: 8%;
}
.rodape {
  margin-top: 9.5%;
  
}

.achar{
  border: 1px solid red;
  
}
</style>