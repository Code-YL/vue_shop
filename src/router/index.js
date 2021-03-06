import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'components/login/Login.vue'
import Home from 'components/home/Home.vue'
import Welcome from 'components/home/Welcome.vue'
import Users from 'views/users/Users.vue'
import Rights from 'views/power/Rights'
import Roles from 'views/power/Roles'
import Cate from 'views/goods/Cate'
import Params from 'views/goods/Params'
import List from 'views/goods/List'
import Add from 'views/goods/Add'
import Order from 'views/order/Order'
import Report from 'views/report/Report'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        component:Welcome
      },
      {
        path:'/users',
        component:Users
      },
      {
        path:'/rights',
        component:Rights
      },
      {
        path:'/roles',
        component:Roles
      },
      {
        path:'/categories',
        component:Cate
      },
      {
        path:'/params',
        component:Params
      },
      {
        path:'/goods',
        component:List,
      },
      {
        path:'/goods/add',
        component:Add
      },
      {
        path:'/orders',
        component:Order
      },
      {
        path:'/reports',
        component:Report
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//设置导航守卫
router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login');
  next()
})

export default router
