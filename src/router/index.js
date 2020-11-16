import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  // {
  //   path: '/login1',
  //   name: 'login1',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Login1.vue')
  // },
  // {
  //   path: '/box',
  //   name: 'box',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/test/box.vue')
  // },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'desktop',
        component: () => import('@/views/Desktop.vue')
      },
      // {
      //   path: '/departmentList',
      //   name: 'departmentList',
      //   component: () => import('@/views/system/Department/DepartmentList.vue')
      // },
      // {
      //   path: '/menuList',
      //   name: 'menuList',
      //   component: () => import('@/views/system/Menu/MenuList.vue')
      // },
      // {
      //   path: '/roleList',
      //   name: 'roleList',
      //   component: () => import('@/views/system/Role/RoleList.vue')
      // },
      // {
      //   path: '/userList',
      //   name: 'userList',
      //   component: () => import('@/views/system/User/UserList.vue')
      // }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
