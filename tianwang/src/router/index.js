import Vue from 'vue'
import Router from 'vue-router'
import mainindex from '@/components/page/mainindex'
import homepage from '@/components/common/homepage'
import proenter from '@/components/page/proenter'
import prosearch from '@/components/page/prosearch'
import userlist from '@/components/page/userlist'
import rolelist from '@/components/page/rolelist'
import SkynetHierachyorgMemu from '@/components/page/dangerin'
import dangerout from '@/components/page/dangerout'
import office from '@/components/page/office'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/mainindex'
    },
    {
      path: '/',
      name: 'homepage',
      component: homepage,
      children:[
        {
          path:'/mainindex',
          component:mainindex,
          meta: { title: '入厂检验数据' }
        },
        {
          path:'/proenter',
          component:proenter,
          meta: { title: '生产下线数据' }
        },
        {
          path:'/prosearch',
          component:prosearch,
          meta: { title: '项目查询' }
        },
        {
          path:'/userlist',
          component:userlist,
          meta: { title: '用户列表' }
        },
        {
          path:'/rolelist',
          component:rolelist,
          meta: { title: '角色列表' }
        },
        {
          path:'/dangerin',
          component:SkynetHierachyorgMemu,
          meta: { title: '入厂检验风险项' }
        },
        {
          path:'/dangerout',
          component:dangerout,
          meta: { title: '生产下线风险项' }
        },
        {
          path:'/office',
          component:office,
          meta: { title: '生产下线风险项' }
        }
      ]
    }
  ]
})
