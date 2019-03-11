<template>
  <el-container>
    <el-header></el-header>
    <el-container>
      <div class="content-box" :class="{'content-collapse':collapse}">
        <!--<el-main>-->
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <!--</el-main>-->
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import elHeader from './header.vue';
  import bus from './bus';
  import ElContainer from "../../../node_modules/element-ui/packages/container/src/main.vue";
  import ElAside from "../../../node_modules/element-ui/packages/aside/src/main.vue";
  import ElMain from "../../../node_modules/element-ui/packages/main/src/main.vue";
  export default {
    data(){
      return {
        tagsList: [],
        collapse: false
      }
      },
        components:{
          ElMain,
          ElAside,
          ElContainer,
          elHeader
      },
    created() {
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })
      // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
      bus.$on('tags', msg => {
        let arr = [];
        for (let i = 0, len = msg.length; i < len; i++) {
          msg[i].name && arr.push(msg[i].name);
        }
        this.tagsList = arr;
      })
    }
  }
</script>
<style>
  .el-main{
    position: absolute;
    left: 10px;
    right: 0;
    top: 10px;
    bottom: 0;
    overflow-y: auto;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }

  .content-box {
    position: absolute;
    left: 0px;
    right: 0;
    top: 130px;
    bottom: 0;
    overflow-y: auto;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }
</style>
