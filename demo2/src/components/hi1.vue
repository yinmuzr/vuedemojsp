<template>
  <div class="app">
    <h1>{{message}}-{{$route.params.username}}-{{$route.params.id}}</h1>
  </div>
</template>

<script>
  export default {
    name:'hi1',
    data(){
      return {
        message: 'i am hi1'
      }
    }
  }
</script>
<style scoped>

</style>
