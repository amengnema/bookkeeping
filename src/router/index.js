import Vue from 'vue'
import VueRouter from 'vue-router'

import Money from '../pages/Money/Money'
import Calendar from '../pages/Calendar/Calendar'
import Reports from '../pages/Reports/Reports'
import EditCate from '../pages/EditCate/EditCate'
import AddCate from '../pages/AddCate/AddCate'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path:'/',
      component:Money
    },
    {
      path:'/money',
      component:Money
    },
    {
      path:'/money/edit',
      component:EditCate
    },
    {
      path:'/money/edit/add/:type',
      component:AddCate
    },
    {
      path:'/calendar',
      component:Calendar
    },
    {
      path:'/reports',
      component:Reports
    }
  ]
})

export default router