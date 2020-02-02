import Vue from 'vue'
import { Button, Input, Loading} from 'element-ui'

Vue.use(Loading.directive);
Vue.use(Button)
Vue.use(Input)

Vue.prototype.$loading = Loading.service;

