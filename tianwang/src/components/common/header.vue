<template>
  <div class="header">
    <div class="el-header">
    <div id="sidebar-wrap">
      <i class="el-icon-view"></i>
    </div>
    <div class="topmenu1">
      <el-menu :default-active="activeIndex1" mode="horizontal" @select="handleSelect" background-color="#001529" text-color="white"  active-text-color="#cb7e95" >
        <el-submenu index="1">
          <template slot="title">总部大基地</template>
          <el-menu-item index="1-1">珠海格力电器总部</el-menu-item>
          <el-menu-item index="1-2">格力大金</el-menu-item>
          <el-menu-item index="1-3">格力凌达</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">国资委</template>
            <el-menu-item index="1-4-1">格力运输公司</el-menu-item>
            <el-menu-item index="1-4-2">格力设备动力</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <div class="topmenu2">
      <el-menu :default-active="activeIndex2,onRoutes" mode="horizontal" @select="handleSelect" background-color="#001529"
               text-color="white"  active-text-color="#cb7e95"  unique-opened router>
        <el-menu-item index="dangerin">风险预警</el-menu-item>
        <el-menu-item index="mainindex">数据监控</el-menu-item>
        <el-menu-item index="control">检验控制计划</el-menu-item>
      </el-menu>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="manangediv">
          <el-menu :default-active="activeIndex3,onRoutes" mode="horizontal" @select="handleSelect" background-color="#001529"
                   text-color="white"  active-text-color="#cb7e95"  unique-opened router>
            <el-menu-item index="userlist">权限管理</el-menu-item>
          </el-menu>
        </div>

        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}<i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="editPwd">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    </div>
    <div class="header2">
      <div class="header2tabs">
        <el-menu :default-active="activeIndex3,onRoutes" mode="horizontal"  background-color="white"
                 text-color="black"  active-text-color="#cb7e95"  unique-opened router style="display: inline-block">
          <el-menu-item v-model="items2" v-for="item in items2" :index="item.indexchirl" :key="item.indexchirl">{{item.labelchirl}}</el-menu-item>
        </el-menu>
    </div>
    </div>
  </div>
</template>
<script>
  import bus from '../common/bus';
  import ElSubmenu from "../../../node_modules/element-ui/packages/menu/src/submenu.vue";
  export default {
    components: {ElSubmenu},
    data: function () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkNewPass !== '') {
            this.$refs.ruleForm.validateField('checkNewPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeIndex1:'',
        activeIndex2:'mainindex',
        activeIndex3:'',
        collapse: false,
        fullscreen: false,
        name: '未知',
        addVisible: false,
        message: 2,
        username:'',
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkNewPass: ''
        },
        items2:[],
        items1:[{
          indexpar:'userlist',
          chirldren:[{
            indexchirl: 'userlist',
            labelchirl: '用户列表'
          },
          {
            indexchirl: 'rolelist',
            labelchirl: '角色列表'
          },
          {
            indexchirl: 'office',
            labelchirl: '科室列表'
          }]
      },
          {
            indexpar:'mainindex',
            chirldren:[{
              indexchirl: 'mainindex',
              labelchirl: '入厂检验数据'
            },
              {
                indexchirl: 'proenter',
                labelchirl: '生产下线数据'
              }]
          },
          {
            indexpar:'dangerin',
            chirldren:[{
              indexchirl: 'dangerin',
              labelchirl: '入厂检验风险项'
            },
              {
                indexchirl: 'dangerout',
                labelchirl: '生产下线风险项'
              }]
          },
        ],
        rules2: {
          newPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkNewPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          oldPass: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
          ],
        }
      };
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    methods: {
      handleSelect(key,path){
        let j = 0;
          for(let i = 0;i <this.items1.length;i++){
            if(key == this.items1[i].indexpar){
                    this.items2=this.items1[i].chirldren;
            }
          }
          j=0;
        console.log(this.items2);
      },
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if (command == 'loginout') {
          localStorage.removeItem('ms_userName');
          localStorage.removeItem('ms_userAccount');
          localStorage.removeItem('ms_userToken');
          localStorage.removeItem('ms_roleName');
          this.$router.push('/');
        }else if(command=='editPwd'){
          this.handleAdd();
        }
      },
      // 侧边栏折叠
      collapseChage() {
        this.collapse = !this.collapse;
        bus.$emit('collapse', this.collapse);
      },
      // 全屏事件
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },
      //提交密码
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            let userAccount = localStorage.getItem('ms_userAccount');
            let userToken = localStorage.getItem('ms_userToken');
            let uploadForm=new FormData();
            uploadForm.append('userPwd', this.ruleForm.oldPass);
            uploadForm.append('newPwd', this.ruleForm.newPass);
            uploadForm.append('userAccount', userAccount);
            this.$axios({
              method: 'post',
              url: 'changePwd',
              data: uploadForm,
              headers: {
                'token': userToken
              }
            }).then((response)=>{
              if (response.data.code===10000){
                this.$message.success('修改密码成功,请重新登录');
                localStorage.removeItem('ms_userName');
                localStorage.removeItem('ms_userAccount');
                localStorage.removeItem('ms_userToken');
                localStorage.removeItem('ms_roleName');
                this.$router.push('/');
                this.removeAdmin();
                this.addVisible = false;
              }else {
                this.$message.error(response.data.msg);
              }
            }).catch((response) => {
              this.$message.error("token已过期，请重新登录");
              this.$router.push('/');
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //点击打开模态框
      handleAdd() {
        this.addVisible = true;

      },
      //关闭弹窗触发的事件
      addClose(done){
        this.removeAdmin();
        this.addVisible = false;
        done();
      },
      //清空添加信息
      removeAdmin(){
        this.ruleForm.oldPass="",
          this.ruleForm.newPass=""
        this.ruleForm.checkNewPass=""
      },
    },
    mounted() {
      if (document.body.clientWidth < 1500) {
        this.collapseChage();
      }
    }
    }
</script>
<style scoped>
  .el-header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    overflow-y: auto;
    /*background-color: #cb7e95;*/
    background-color: #001529;
    /*background-image: url("../../assets/header.jpg") ;*/
    /*background-repeat: no-repeat;*/
    /*background-size: 100% 70px;*/
  }
  .header2{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    overflow-y: auto;
    background-color:red;
  }
  .el-header .logo {
    float: left;
    width: 88px;
    line-height: 70px;
  }
  .el-header .topmenu1 {
    float: left;
    width: 100px;
    line-height: 70px;
    margin-left: 2%;
  }
  .el-header .topmenu2 {
    float: left;
    width: 320px;
    line-height: 70px;
    margin-left: 27.5%;
  }
  .header-right {
    float: right;
    padding-right: 0px;
    position: relative;
  }

  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }
  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

  .btn-bell .el-icon-bell {
    color: #fff;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }

  #sidebar-wrap {
    float: left;
    padding: 0 15px;
    cursor: pointer;
    line-height: 70px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom:none;
  }
  .el-menu-item.is-active {
    color: #cb7e95;
    border-bottom-color: #001529;
    background-color: rgb(53, 49, 50);
  }
  .el-header .el-menu--horizontal > .el-menu-item {
    height: 70px;
    line-height: 70px;
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 70px;
    line-height: 60px;
  }
  .header2tabs{
    text-align: center;
    height: 70px;
    background-color: white;
  }

</style>
