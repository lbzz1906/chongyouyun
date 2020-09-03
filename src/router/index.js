import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/view/login'
import sign from '@/view/sign'
import register from '@/view/register'
import doctor from '@/view/doctor'
import drugs from '@/view/drugs'
import rooter from '@/view/rooter'
import outDrugs from '@/view/outDrugs'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/h',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: "login",
      component: login
    },
    {
      path: '/sign',
      name: "sign",
      component: sign
    },
    {
      path:'/register',
      name: "register",
      component: register
    },
    {
      path:'/doctor',
      name: "doctor",
      component: doctor
    },
    {
      path:'/drugs',
      name: "drugs",
      component: drugs
    },
    {
      path:'/rooter',
      name: "rooter",
      component: rooter
    },
    {
      path:'/out',
      name:"outDrugs",
      component: outDrugs
    }
  ]

})
