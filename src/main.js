import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vue-x/store'
import vuetify from './plugins/vuetify'
import './plugins/vue-validate'

Vue.config.productionTip = false

Vue.filter('deixarMinusculo', function (valor) {
    return valor.toLowerCase()
})
Vue.filter('filtroSimboloReal', function(valor){
    return "R$ " + valor
})

Vue.filter('trocarVirgulaPorPonto', function(valor){
    return valor.replace(".", ",")
})
new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
