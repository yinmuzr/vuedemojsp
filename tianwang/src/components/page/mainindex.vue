<template>
  <div class="mainindex">
    <el-button style="width: 60px;border:none;border-radius: 60px;height: 60px;background-color: #cb7e95;color: white;font-size: small;position:absolute;top: 180px;left:10px;z-index: 1;box-shadow:2px 7px 15px grey">筛选</el-button>
    <div class="main">
      <div class="mainmiddlemenu">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="margin-left: 3%">
          <el-menu-item index="1">抽检</el-menu-item>
          <el-menu-item index="2">全检</el-menu-item>
          <el-menu-item index="3">型式检</el-menu-item>
        </el-menu>
      </div>
      <div class="spangroup">
        <el-row type="flex" class="row-bg" justify="space-aroung">
          <span class="span1" style="margin-left:5%">总匹数</span>
          <span class="span2" style="margin-left:1%">355</span>
          <span class="span1" style="margin-left:20%">不合格匹数</span>
          <span class="span2" style="margin-left:1%">12</span>
          <span class="span1" style="margin-left:20%">不合格类型</span>
          <span class="span1" style="margin-left:1%">A</span>
          <span class="span2" style="margin-left:1%">1</span>
          <span class="span1" style="margin-left:2%">B</span>
          <span class="span2" style="margin-left:1%">2</span>

          <span class="span1" style="margin-left:2%">C</span>
          <span class="span2" style="margin-left:1%">5</span>

          <span class="span1" style="margin-left:2%">D</span>
          <span class="span2" style="margin-left:1%">12</span>

          <span class="span1" style="margin-left:2%">E</span>
          <span class="span2" style="margin-left:1%">7</span>
        </el-row>
      </div>

      <div class="tablediv">
        <div class="dropdiv">
          <el-dropdown style="margin-top: 2%;border: .5px solid;border-radius: 25px;">
            <span class="el-dropdown-link">   请选择筛选条件<i class="el-icon-arrow-down el-icon--right"></i>  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>按检验员查看</el-dropdown-item>
              <el-dropdown-item>按物料不合格率查看</el-dropdown-item>
              <el-dropdown-item>按物料类型查看</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="mytable">
          <template>
            <el-table :data="tableData" stripe style="width: 100%" >
              <el-table-column prop="goods" label="物料名" min-width="70" ></el-table-column>
              <el-table-column prop="rate" label="合格率" min-width="110" sortable>
                <template slot-scope="scope">
                  <el-progress :percentage=scope.row.rate></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="person" label="检验员" min-width="70"></el-table-column>
              <el-table-column prop="sum" label="总批数" min-width="70"></el-table-column>
              <el-table-column prop="number" label="不合格批数" min-width="90"></el-table-column>
              <el-table-column prop="type" label="不合格类别" min-width="90"></el-table-column>
              <el-table-column prop="A" label="A" min-width="50"></el-table-column>
              <el-table-column prop="B" label="B" min-width="50"></el-table-column>
              <el-table-column prop="C" label="C" min-width="50"></el-table-column>
              <el-table-column prop="D" label="D" min-width="50"></el-table-column>
              <el-table-column prop="E" label="E" min-width="50"></el-table-column>
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
    name: 'mainindex',
    data() {
      return {
        activeIndex1: "1",
        activeIndex2: "2",
        tableData: [{
          goods: '送风机',
          rate: 78,
          person: '王芳',
          sum: 12,
          number: 5,
          type: '',
          A: 4,
          B: 7,
          C: 3,
          D: 7,
          E: 1
        }]
      }
    },
    methods: {
      handleSelect(key,keyPath) {
        console.log(key+keyPath);
      }
    }
  }
</script>
<style>
  .mainindex .maintopmenu .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
  .mainindex .main{
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
  .mainindex .mainmiddlemenu{
    text-align: center;
    height: 60px;
    background-color: white;
  }
  .mainindex .mainmiddlemenu .el-menu--horizontal > .el-menu-item {
    height: 60px;
    line-height: 60px;
  }
  .mainindex .span2{
    font-size: 28px;
  }
  .mainindex .span1{
    color: #cb7e95;
    font-size: 15px;
  }
  .mainindex .spangroup{
    margin-top: 1.5%;
    margin-bottom: 1%;
  }
  .mainindex .tablediv{
    background-color: white;
    height: auto;
  }
  .tablediv .el-dropdown-link {
    color: #cb7e95;
    cursor: pointer;
  }
  .mainindex .dropdiv{
    margin-bottom: 1%;
    margin-left: 2%;
  }
  .mainindex .mytable{
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
</style>
