import Vue from 'vue'
import { Container, Header, Main, Footer,RadioGroup,RadioButton,Form,FormItem,Input,DatePicker,Button,Radio,Empty,Message,MessageBox} from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Radio)
Vue.use(Empty)