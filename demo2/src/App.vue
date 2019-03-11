<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <button @click="goback">goback</button>
      <button @click="gobefore">gobefore</button>
      <button @click="gohome">gohome</button>
    </div>
    <div>
      <p>导航：
      <router-link to="/">index</router-link>|
      <router-link to="/hi">hi</router-link>|
      <router-link :to="{name:'HelloWorld/hi1',params:{username:'zr',id:'13'}}">hi1</router-link>|
      <router-link to="/hi/hi2">hi2</router-link>|
      <router-link to="/params/1122/zrym">Params</router-link>|
        <router-link to="/gohome">gohome</router-link>|
      <router-link to="/goparams/4444/rrrrr">goparams</router-link>
        <router-link to ="/zr">zr</router-link>
      </p>
    </div>
    <p>{{$route.name}}</p>
    <transition name="fade" mode="out-in">
    <router-view/>
    <router-view name="left" style="float:left;width:50%;background-color:red;height:300px;"></router-view>
    <router-view name="right" style="float:right;width:50%;background-color:gray;height:300px;"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    goback(){
      this.$router.go(-1);
    },
    gobefore(){
      this.$router.go(1);
    },
    gohome(){
      this.$router.push('/');
    }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


.fade-enter{
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
</style>
