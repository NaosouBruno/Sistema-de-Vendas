<template class="menu">
  <v-app>
    <div id="app">
      <div id="nav">
        <v-card>
          <v-tabs centered>
            <v-tab to="/">Home</v-tab>
            <v-tab to="/produtos">Produtos</v-tab>
            <v-tab to="/pedido">Pedidos</v-tab>
          </v-tabs>
        </v-card>
      </div>
      <router-view />
    </div>
  </v-app>
</template>
<script>

export default {
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
 
}

 #nav a.router-link-exact-active {
  border: 1px solid red;
} 

/* @media only screen and (max-device-width: 900px) {
    #menu { 
        width:100%;
        font-size: x-small;
        background: #42b983;
    }
} */
</style>
