import {
    Button,
    MessageBox,
    Message,
    Dialog,
    Form,
    FormItem,
    Input
} from 'element-ui'

const element = {
    install: function(Vue) {
        Vue.use(Button);
        Vue.use(Dialog);
        Vue.use(Form);
        Vue.use(FormItem)
        Vue.use(Input)

        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$message =Message;
        
    }
}
export default element
