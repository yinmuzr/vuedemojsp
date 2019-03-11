<template>
  <div>
    <h2>{{msg}}</h2>
    <hr/>
    <!--<h3>{{$store.state.count}};{{count}}</h3>-->
    <h3>{{$store.state.a.count}}</h3>
    <p><button @click=add(4)>add</button>
    <button @click='reduce'>reduce</button>
    <button @click="$store.commit('reduce')">red</button></p>
    <p><button @click=addAction>add2</button>
      <button @click='reduceAction'>reduce2</button></p>
    <hr/>

  </div>
</template>
<script>
  import store from '@/vuex/store'
  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  export default {
    data(){
      return{
        msg:'hello Vuex',
      }
    },
//    computed:{
//        count:function () {
//          return store.state.count+";"+this.$store.state.count;
//        }
//    },
//        computed:{
//        count() {
//          return store.state.count+";"+this.$store.state.count;
//        }
//    },
//    computed:mapState({
//      count:state=>state.count
//    }),
        computed:{
          ...mapState(['count']),
          ...mapGetters(['count'])
       },
    methods:{
      ...mapMutations(['add','reduce']),
      ...mapActions(['addAction','reduceAction'])
    },
    store
  }
</script>
