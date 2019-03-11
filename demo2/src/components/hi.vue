<template>
  <div class="app">
    <h1>{{message}}</h1>
    <router-view class="aaa"></router-view>
  </div>
</template>

<script>
  export default {
    name:'hi',
    data(){
      return {
        message: 'i am hi'
      }
    }
  }
</script>
<style scoped>

</style>
