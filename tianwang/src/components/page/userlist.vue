<template>
  <div class="userlist">
    <div class="main">
      <div class="mainmiddlemenu">
        <div class="dropdiv">
          <el-dropdown @command="handlecommand">
            <span class="el-dropdown-link">&nbsp;&nbsp;&nbsp;{{activeoption}}<i class="el-icon-arrow-down el-icon--right"></i>&nbsp;</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in options1" :key="item" command="item">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--<el-select style="width: 70%" v-model="adduser.role" placeholder="请选择筛选条件">-->
            <!--<el-option-->
              <!--v-for="item in options"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        </div>
        <el-button @click="handleadd" style="background-color: blue;color: white;margin-left: 1%;margin-top: .7%;border-radius: 25px;"><i class="el-icon-arrow-down el-icon-plus"></i>新增用户</el-button>
      </div>
      <div class="spangroup">
        <el-row type="flex" class="row-bg" justify="space-aroung">
          <span class="span1" style="margin-left:5%">总匹数</span>
          <span class="span1" style="margin-left:10%">物料组权限：</span>
          <span class="span1" style="margin-left:1%"></span>
          <span class="span1" style="margin-left:10%">基地权限：</span>
          <span class="span1" style="margin-left:1%"></span>
          <span class="span1" style="margin-left:10%">管理权限：</span>
          <span class="span1" style="margin-left:1%"></span>
        </el-row>
      </div>

      <div class="tablediv">
        <div class="mytable">
          <template>
            <el-table :data="tableData" stripe style="width: 100%" >
              <el-table-column prop="username" label="用户姓名" min-width="70"></el-table-column>
              <el-table-column prop="department" label="部门" min-width="70"></el-table-column>
              <el-table-column prop="office" label="科室" min-width="90"></el-table-column>
              <el-table-column prop="goods" label="物料权限" min-width="90"></el-table-column>
              <el-table-column prop="role" label="对应角色" min-width="50"></el-table-column>
              <el-table-column prop="" label="操作" min-width="50">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-arrow-down el-icon-edit"></i></el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-arrow-down el-icon-delete"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination :total="dataTotal" @current-change="handleCurrentChange" @size-change="handleSizeChange"
              :current-page="currentPage" :page-sizes="[10,20,50,100]" :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!--添加弹出框-->
    <el-dialog title="新增用户" :visible.sync="addVisible" width="40%" :before-close="addClose">
      <el-form ref="adduser" :model="adduser" label-width="90px" :rules="rules2">
        <el-form-item label="用户姓名" prop="username">
          <el-select style="width: 100%;" v-model="adduser.username" filterable remote reserve-keyword placeholder="输入人员ID进行匹配"
                     :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料权限" prop="goods">
          <!--<el-input type="password" v-model="adduser.goods" auto-complete="off"></el-input>-->
          <div class="selectdiv">
            <el-select style="width: 100%;" v-model="adduser.goods" multiple filterable remote reserve-keyword placeholder="输入物料编码进行匹配"
                       :remote-method="remoteMethod" :loading="loading">
              <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button type="text" style="margin-top: 160px;float: right">所管辖的全部物料</el-button>
          </div>

        </el-form-item>
        <el-form-item label="对应角色" prop="role">
          <!--<el-input type="password" v-model="adduser.role" auto-complete="off"></el-input>-->
          <el-select style="width: 100%" v-model="adduser.role" placeholder="请选择对应角色">
            <el-option
              v-for="item in roleoptions"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('adduser')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import ElMain from "../../../node_modules/element-ui/packages/main/src/main.vue";
  import ElDropdown from "../../../node_modules/element-ui/packages/dropdown/src/dropdown.vue";
  import ElDropdownMenu from "../../../node_modules/element-ui/packages/dropdown/src/dropdown-menu.vue";
  import ElProgress from "../../../node_modules/element-ui/packages/progress/src/progress.vue";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  export default {
    components: {
      ElButton,
      ElProgress,
      ElDropdownMenu,
      ElDropdown,
      ElMain},
    name: 'userlist',
    data() {
      return {
        addVisible: false,
        restaurants: [],
        timeout:  null,
        options4: [],
        options3: [],
        options1: [
        ],
        list: [],
        loading: false,
        activeoption:'请选择筛选条件',
        adduser: {
          username: '',
          goods: '',
          role: ''
        },
        roleoptions: [],
        value11: [],
        rules2: {
          username: [
            {required: true, message: '输入人员ID进行匹配', trigger: 'blur'}
          ],
          goods: [
            {required: true, message: '输入物料编码进行匹配', trigger: 'blur'}
          ],
          role: [
            {required: true, message: '请选择对应角色', trigger: 'blur'},
          ],
        },
        tableData: [{
          username: '送风机',
          department: 78,
          office: '王芳',
          goods: 12,
          role: 5,
        }]
      }
    },
    methods: {
      handleSelect(key,keyPath) {
        console.log(key+keyPath);
      },
      handleadd(){
        this.addVisible = true;
      },
      addClose(done){
        this.removeAdmin();
        this.addVisible=false;
        done();
      },
      handleEdit(index, row) {
        this.handleadd();
      },
      //清空添加信息
      removeAdmin(){
        this.adduser.username="",
          this.adduser.goods="",
        this.adduser.role=""
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handlecommand(command) {
        console.log(command);
         this.activeoption=command;
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
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
              this.options1=response.data;
          }else {
            this.$message.error(response.msg);
          }
        }).catch((response) => {
          this.$message.error("token已过期，请重新登录");
//          this.$router.push('/');
        });
      },
      //获取所有角色
      getAllrole(){
        this.$axios({
          method: 'post',
          url: '/userlist/getAllrole',
          headers: {
            'token': userToken
          }
        }).then((response)=>{
          if (response.code===0){
            this.options1=response.data;
          }else {
            this.$message.error(response.msg);
          }
        }).catch((response) => {
          this.$message.error("token已过期，请重新登录");
//          this.$router.push('/');
        });
      }
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
  .userlist .maintopmenu .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
  .userlist .main{
    position: absolute;
    left: 40px;
    right: 40px;
    top: 30px;
    bottom: 0;
    overflow-y: auto;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }
  .userlist .mainmiddlemenu{
    height: 60px;
    background-color: white;
  }
  .userlist .mainmiddlemenu .el-menu--horizontal > .el-menu-item {
    height: 60px;
    line-height: 60px;
  }
  .userlist .span2{
    font-size: 28px;
  }
  .userlist .span1{
    color: #cb7e95;
    font-size: 15px;
  }
  .userlist .spangroup{
    margin-top: 1.5%;
    margin-bottom: 1%;
  }
  .tablediv{
    background-color: white;
    height: auto;
  }
  .tablediv .el-dropdown-link {
    color: #cb7e95;
    cursor: pointer;
  }
  .userlist .dropdiv{
    border: .5px solid;
    border-radius: 25px;
    border-color: lightslategrey;
    float: left;
    margin-left: 3%;
    margin-top: 1.2%;
  }
  .userlist .mytable{
    margin-left: 3%;
    margin-bottom: 2%;
    margin-inline-end:3%;
    margin-outside: 2%;
  }
  .pagination {
    margin: 20px 0;
    text-align: right;
  }
  .el-dropdown {
    color: #888a8f;
  }
  .userlist .selectdiv{
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: 240px;
    width: 100%;
  }
 .selectdiv .el-input__inner{
    border: none;
  }
 /*.userlist .dropdiv .el-input__inner{*/
    /*!*border: .5px solid;*!*/
    /*!*border-radius: 25px;*!*/
    /*!*border-color: lightslategrey;*!*/
    /*border: none;*/
    /*height: 38px;*/
  /*}*/
</style>
