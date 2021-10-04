import Vue from 'vue';
import VeeValidate, {Validator} from 'vee-validate';
import ptbr from 'vee-validate/dist/locale/pt_BR'

Vue.use(VeeValidate);
Validator.localize('pt_BR', ptbr)