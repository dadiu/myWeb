import Vue from 'vue';
import {
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Progress,
    Row,
    Col,
    Form,
    FormItem,
    DatePicker,
    RadioGroup,
    Radio,
    Input,
    Tag,
    Table,
    TableColumn,
    Alert,
    Loading,
    Message,
    MessageBox,
    Dialog
} from 'element-ui';


Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Progress);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Input);
Vue.use(Tag);
Vue.use(Alert);
Vue.use(Loading.directive);
Vue.use(Table);
Vue.use(TableColumn);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;