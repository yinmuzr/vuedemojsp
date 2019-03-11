<template>
  <div class="app">
    <h1>{{message}}</h1>
    <p>newid:{{$route.params.newid}}</p>
    <p>newid:{{$route.params.newstitle}}</p>
  </div>
</template>

<script>
  export default {
    name:'hi2',
    data(){
      return {
        message: 'params page'
      }
    } ,
    beforeRouteEnter:(to,from,next)=>{
      console.log("entering");
      next();
    },
    beforeRouteLeave:(to,from,next)=>{
      console.log("leaving");
      next();
    }
  }
</script>
<style scoped>

</style>
