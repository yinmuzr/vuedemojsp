import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hi from '@/components/hi'
import hi1 from '@/components/hi1'
import hi2 from '@/components/hi2'
import Params from '@/components/Params'
import Error from '@/components/Error'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    }
    ,{
      path: '/hi',
      // component: hi,
      children:[
        {path:'/',name:'HelloWorld/hi',component:hi},
        {path:'hi1',name:'HelloWorld/hi1',component:hi1},
        {path:'hi2',name:'HelloWorld/hi2',component:hi2},
      ],
        components: {
          default:hi,
          left:hi1,
          right:hi2
        },
      alias:'/zr'
    }
    ,{
      path:'/params/:newid(\\d+)/:newstitle',
      component:Params,
      beforeEnter:(to,from,next)=>{
        console.log(to);
        console.log(from);
        // next(true);
        next();
        // next({path:'/'})
      }
    }
    ,{
      path:'/gohome',
      redirect:'/'
    }
    ,{
      path:'/goparams/:newid(\\d+)/:newstitle',
      redirect:'/params/:newid(\\d+)/:newstitle'
    }
  ,{
    path:'*',
    component:Error
  }
  ]
})
