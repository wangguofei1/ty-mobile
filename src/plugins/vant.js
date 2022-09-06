// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  List,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  NavBar,
  Divider,
  Form,
  Field,
  Image as VanImage,
  Uploader,
  Search,
  Tab,
  Tabs,
  Popup,
  PullRefresh,
  DatetimePicker,
  ImagePreview,
  Calendar,
  Dialog,
  Icon,
  Toast,
  Step,
  Overlay,
  Steps,
  Picker
} from 'vant'
Vue.use(Button)
Vue.use(Overlay)
Vue.use(Cell)
Vue.use(ImagePreview)
Vue.use(CellGroup)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Divider)
Vue.use(NavBar)
Vue.use(Popup)
Vue.use(Field)
Vue.use(Form)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Form)
Vue.use(Field)
Vue.use(VanImage)
Vue.use(Uploader)
Vue.use(Search)
Vue.use(Toast)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(DatetimePicker).use(Dialog).use(Calendar).use(Picker).use(PullRefresh).use(Icon)
