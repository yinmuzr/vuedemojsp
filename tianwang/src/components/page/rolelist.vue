<template>
<div class="userdiv">
<div class="userdivmain">
  <div class="operdiv">
    <div class="dropdiv">
  <Dropdown @command="handlecommand" >
    <a class="dropdiva">{{selectedoffice}}
      <Icon type="ios-arrow-down"></Icon>
    </a>
    <DropdownMenu slot="list">
      <DropdownItem v-for="office in officelist" :key="office" command="office">{{office}}</DropdownItem>
    </DropdownMenu>
  </Dropdown>
    </div>
  <Button type="primary" shape="circle" @click="addbtnmethod" icon="md-add" class="adduserbtn">新增用户</Button>
</div>
  <div class="spangroup">
    <div class="spandiv">
    <el-row type="flex" style="" class="row-bg" justify="space-aroung">
      <span class="spandetail" style="margin-left:6%">{{officedetail.office}}</span>
      <span class="spandetail" style="margin-left:10%">物料组权限：</span>
      <span class="spandetail" style="margin-left:1%">{{officedetail.Martrialpermission}}</span>
      <span class="spandetail" style="margin-left:10%">基地权限：</span>
      <span class="spandetail" style="margin-left:1%">{{officedetail.Foudationpermission}}</span>
      <span class="spandetail" style="margin-left:10%">管理权限：</span>
      <span class="spandetail" style="margin-left:1%">{{officedetail.Mananger}}</span>
    </el-row>
  </div>
  </div>
  <div class="usertablediv">
    <div class="usertable">
      <div>
      <Table min-height="100" :columns="usercolumns" :data="userlist" stripe></Table>
      </div>
    <div class="userpagination">
    <Page :total="amount" size="small" show-elevator show-sizer show-total />
    </div>
  </div>
  </div>

  <Modal
    :title="modeltitle"
    v-model="operuserdiv" draggable>
    <Form ref="userform" :model="userform" :rules="userrules" :label-width="80">
      <FormItem label="用户姓名" prop="username">
        <Select
          v-model="userform.username"
          filterable
          remote
          :remote-method="GetUsernameById"
          :loading="loadingusername">
          <Option v-for="(usernameitem, index) in usernamelist" :value="usernameitem" :key="index">{{usernameitem}}</Option>
        </Select>
      </FormItem>
      <FormItem label="物料权限" prop="materialpermission">
        <div class="materialdiv">
        <Select id="material"
          v-model="userform.materialpermission"
          filterable
          remote
          multiple
          :remote-method="GetMaterialListByCode"
          :loading="loadingmaterialpermission">
          <Option v-for="(materialpermission, index) in materialpermissionlist" :value="materialpermission" :key="index">{{materialpermission}}</Option>
        </Select>
          <Button type="text" class="allmaterialbtn">所管辖的全部物料</Button>
        </div>
      </FormItem>
      <FormItem label="对应角色" prop="role">
        <Select v-model="userform.role" clearable style="">
          <Option v-for="roleitem in roleList" :value="roleitem" :key="roleitem">{{ roleitem }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
        <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </Modal>

</div>
</div>
</template>
<script>
  export default {
    name: 'rolelist',
    data() {
      return {
        selectedoffice: '请选择筛选条件',
        officelist:[],
        rolelist:[],
        officedetail:[],
        operuserdiv:false,
        amount:0,
        loadingusername:false,
        loadingmaterialpermission:false,
        usernamelist:[],
        roleList:[],
        materialpermissionlist:[],
        modeltitle:'',
        userlist:[{
          Username:'gg',
          Userdepartment:'j',
          Useroffice:'ggdghghghg',
          Martrialpermission:'g',
          role:'g'
        }
        ],
        userform: {
          username: '',
          materiallist: '',
          age: ''
        },
        usercolumns:[{
          title: '用户姓名',
          key: 'Username',
          tooltip:true,
        },
          {
            title: '部门',
            key: 'Userdepartment',
            tooltip:true,
          },
          {
            title: '科室',
            key: 'Useroffice',
            tooltip:true,
          },
          {
            title: '物料权限',
            key: 'Martrialpermission',
            tooltip:true,
          },
          {
            title: '对应角色',
            key: 'role',
            tooltip:true,
          },
          {
            title: '操作',
            key: 'action',
            width: 250,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button',{
                  props: {
                    type: '',
                    size: 'small'
                  },
                  style: {
//                    border: 'none'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, [
                  h('Icon',{
                    props:{
                      type:'md-create',
                      size:'23'
                    },
                  })
                ]),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '5%'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, [
                     h('Icon',{
                        props:{
                          type:'ios-trash-outline',
                          size:'23'
                        }
                     })
                  ])
              ]);
            }
          }
        ],
      }
    },
    methods: {
      handlechange(value) {
//        console.log(value);
      },
      //显示选中的科室
      handlecommand(command) {
        console.log(command);
        this.selectedoffice = command;
        this.searchUserlist(command);
      },
      //获取所有角色
      getAllrole() {
        this.$axios({
          method: 'post',
          url: '/userlist/getAllrole',
          headers: {
            'token': userToken
          }
        }).then((response) => {
          if (response.code === 0) {
            this.rolelist = response.data;
          } else {
            this.$message.error(response.msg);
          }
        }).catch((response) => {
          this.$message.error("token已过期，请重新登录");
//          this.$router.push('/');
        });
      },
      addbtnmethod(){
        this.modeltitle="新增角色";
        this.operuserdiv=true;
        this.getAllrole();
      },
      //获取所有科室
      getAllOffice(queryfoudation){
        this.$axios({
          method: 'post',
          url: '/userlist/getAllOffice',
          data: JSON.stringify({
            foudation:queryfoudation
          }),
          headers: {
            'token': userToken
          }
        }).then((response)=>{
          if (response.code===0){
            this.officelist=response.data;
          }else {
            this.$message.error(response.msg);
          }
        }).catch((response) => {
          this.$message.error("token已过期，请重新登录");
//          this.$router.push('/');
        });
      },
      //查询
      searchUserlist(command){
        if (command !== '') {
//          this.loadingusername = true;
          this.$axios({
            method: 'post',
            url: '/userlist/searchUserlist',
            data: JSON.stringify({
              office: command,
              page:'',
              size:'',
              foudation:queryfoudation
            }),
            headers: {
              'token': userToken
            }
          }).then((response) => {
            if (response.code === 0) {
//              this.loadingusername = false;
              this.officedetail = response.data.officedetail;
              this.userlist = response.data.Userlist.list;
              this.amount = response.data.Userlist.amount;
            } else {
              this.$message.error(response.msg);
            }
          }).catch((response) => {
            this.$message.error("token已过期，请重新登录");
//          this.$router.push('/');
          });
        }
      },
      //根据id匹配人员姓名
      GetUsernameById(queryid){
        if (queryid !== '') {
          this.loadingusername = true;
          this.$axios({
            method: 'post',
            url: '/userlist/GetUsernameById',
            data: JSON.stringify({
              ID: queryid
            }),
            headers: {
              'token': userToken
            }
          }).then((response) => {
            if (response.code === 0) {
              this.loadingusername = false;
              this.usernamelist = response.data;
            } else {
              this.$message.error(response.msg);
            }
          }).catch((response) => {
            this.$message.error("token已过期，请重新登录");
//          this.$router.push('/');
          });
        }
      },
      //GetMaterialListByCode
      GetMaterialListByCode(querycode){
        if (querycode !== '') {
          this.loadingmaterialpermission = true;
          this.$axios({
            method: 'post',
            url: '/userlist/GetMaterialListByCode',
            data: JSON.stringify({
              ID: querycode
            }),
            headers: {
              'token': userToken
            }
          }).then((response) => {
            if (response.code === 0) {
              this.loadingmaterialpermission = false;
              this.materialpermissionlist = response.data;
            } else {
              this.$message.error(response.msg);
            }
          }).catch((response) => {
            this.$message.error("token已过期，请重新登录");
//          this.$router.push('/');
          });
        }
      },
      show (index) {
        this.modeltitle="修改角色";
        this.operuserdiv=true;
      },
    },
    mounted() {
      this.restaurants = this.loadAll();
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
      //获取所有科室
      this.getAllOffice(queryfoudation);
    },
  }
</script>
<style>
.userdiv .userdivmain{
  position: absolute;
  left: 40px;
  right: 40px;
  top: 30px;
  bottom: 0;
  overflow-y: auto;
  -webkit-transition: left .3s ease-in-out;
  transition: left .3s ease-in-out;
  background: #f0f0f0;
  min-width: 700px;
}
.userdiv .operdiv{
  background-color: white;
}
.userdiv .dropdiv{
  /*border: .5px solid;*/
  /*border-radius: 25px;*/
  /*border-color: lightslategrey;*/
  float: left;
  padding-left: 6%;
  padding-top: 1.2%;
}
  .adduserbtn{
    margin-left: 3%;
    margin-top: .8%;
    margin-bottom: .8%;
    font-size:15px;
  }
.dropdiva{
  color: black;
  font-size: larger;
}
.userdiv .spangroup{
  background-color: #dbebff;
}
.userdiv .spandetail{
  color: black;
  font-size: 15px;
}
.spandiv{
    padding-top: 1.5%;
    padding-bottom: 1.5%;
}
.userdiv .usertablediv{
  background-color: white;
  height: auto;
}
.usertablediv  .usertable{
  width: 90%;
  margin-left: 5%;
  padding-top: 3%;
  padding-bottom: 5%;
}
  .userpagination{
    padding-bottom: 1%;
    padding-top: 3%;
    text-align: right;
  }
 .materialdiv{
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 240px;
  width: 100%;
}
.allmaterialbtn{
  margin-top: 170px;
  float: right
}
.materialdiv .ivu-select-selection {
  border: none;
}
.materialdiv .ivu-btn-text:focus {
  box-shadow: 0px 0px 0px 0px rgba(45,140,240,.2);
}
.materialdiv .ivu-select-visible .ivu-select-selection {
  /*border-color: #57a3f3;*/
  outline: 0;
  box-shadow: 0 0 0 0px rgba(45,140,240,.2);
}
</style>
