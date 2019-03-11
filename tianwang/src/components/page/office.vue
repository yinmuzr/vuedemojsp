<template>
  <div class="officediv">
    <div class="userdivmain">
      <div class="operdiv">
        <div class="dropdiv">
          <blockquote class="quote">
            <b style="font-size: 16px">组织权限</b>
          </blockquote>
        </div>
      </div>
      <div class="Rectangle-11">
        <span class="spanstrong" style="margin-left:1%">机械检验科-科室</span>
        <span class="spannoamal" style="margin-left:0%">所属组织：</span>
        <span class="spannoamal" style="margin-left:0%">所属组织：格力-集团-珠海总部分厂</span>
      </div>
      <!--<div class="spangroup">-->
        <!--<div class="spandiv">-->
          <!--<Row>-->
            <!--<Col :xs="7" :sm="7" :md="7" :lg="5">-->
            <!--<span class="spandetail" style="margin-left:1%">{{officedetail.Martrialpermission}}</span>-->
            <!--</Col>-->
            <!--<Col :xs="17" :sm="17" :md="17" :lg="19">-->
            <!--<span class="spandetail" style="margin-left:0%">所属组织：</span>-->
            <!--<span class="spandetail" style="margin-left:0%">{{officedetail.Foudationpermission}}</span>-->
            <!--</Col>-->
          <!--</Row>-->
          <!--<Row>-->
            <!--<Col :xs="12" :sm="13" :md="13" :lg="14">-->
            <!--<span class="spandetail" style="margin-left:5%">物料组权限：</span>-->
            <!--<span class="spandetail" style="margin-left:1%">{{officedetail.Martrialpermission}}</span>-->
            <!--</Col>-->
            <!--<Col :xs="7" :sm="7" :md="7" :lg="7">-->
            <!--<span class="spandetail" style="margin-left:0%">基地权限：</span>-->
            <!--<span class="spandetail" style="margin-left:0%">{{officedetail.Foudationpermission}}</span>-->
            <!--</Col>-->
            <!--<Col :xs="5" :sm="4" :md="4" :lg="3">-->
            <!--<Button type="text"  @click=""><Icon type="ios-create-outline" style="font-size: 23px;"/></Button>-->
            <!--<Button type="text"  @click=""><Icon type="ios-trash-outline" style="font-size: 23px"/></Button>-->
            <!--</Col>-->
          <!--</Row>-->
        <!--</div>-->
      <!--</div>-->

      <div class="usertablediv">
        <div class="operdiv">
          <div class="dropdiv2">
            <blockquote class="quote" style="float: left">
              <b style="font-size: 16px">人员权限</b>
            </blockquote>
            <Button type="primary"  @click="addbtnmethod" icon="md-add" class="adduser">新增用户</Button>
          </div>
        </div>

        <div class="usertable">
          <div>
            <Table min-height="100"  :columns="usercolumns" :data="userlist" stripe></Table>
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
  import Row from "../../../node_modules/iview/src/components/grid/row.vue";

  export default {
    components: {Row},
    name: 'office',
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
  .officediv .userdivmain{
    position: absolute;
    left: 40px;
    right: 40px;
    top: 30px;
    bottom: 0;
    overflow-y: auto;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
    min-width: 660px;
  }



  .officediv .operdiv{
    background-color: white;
  }
  .officediv .dropdiv{
       margin-left: .8%;
       padding-top: 22px;
       padding-bottom: 15px;
     }
  .officediv .dropdiv2{
    margin-left: .8%;
    padding-top: 30px;
    padding-bottom: 15px;
  }
 .adduser{
    float: right;
    /*margin-top: .8%;*/
   margin-right: 5%;
    font-size:14px;
  }
  .dropdiva{
    color: black;
    font-size: larger;
  }
  .officediv .spangroup{
    background-color: #dbebff;
  }
  .officediv .spannoamal{
    width: 348px;
    height: 20px;
    font-family: PingFangSC;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 1px;
    color: #4a4f5d;
  }
  .officediv .spanstrong{
    width: 131px;
    height: 22px;
    font-family: PingFangSC;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 1.1px;
    color: #4a4f5d;
  }
  .spandiv{
    padding-top: 18px;
    padding-bottom: 12px;
    line-height: 35px;
  }
  .officediv .usertablediv{
    background-color: white;
    height: auto;
  }
  .officediv  .usertablediv  .usertable{
    width: 96%;
    margin-left: 2%;
    padding-top: 36px;
    padding-bottom: 36px;
  }
  .userpagination{
    padding-bottom: 5px;
    padding-top: 10px;
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
  .quote{
    padding:10px;
    line-height:5px;
    border-left:4px solid #3977fc;
    height: 16px;
    padding-top: ;
  }


</style>
