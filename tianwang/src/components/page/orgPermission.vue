<template>
<div>
  <div class="Line-6"></div>
  <div style="height: 60px">
    <div class="mydiv4" style="margin-top: 26px;"></div>
    <div class="myspan myspan1" style="margin-top: 22px;">组织权限</div>
  </div>
  <div class="Rectangle-11">
    <div style="padding-top: 28px">
      <div class="myspan myspan2">{{orgpermission.orgname}}</div>
      <div class="myspan myspan3" style="padding-left:2%;">所属组织：{{orgpermission.affiliatedorg}}</div>
    </div>
    <div style="height: 20px;margin-top: 20px"></div>
    <template v-if="isshoworgpermission">
      <Button type="text"  @click="" icon="md-add" class="mybtn2">配置本组织权限</Button>
    </template>
    <template v-else="isshoworgpermission">
      <div class="myspan myspan4" style="padding-left: 5%;margin-top: 2px;">物料组权限：{{orgpermission.materialorgpermission}}
        <div class="mydiv1">
          <Button type="text"  @click=""><Icon type="ios-create-outline" style="font-size: 20px;"/></Button>
          <Button type="text"  @click=""><Icon type="ios-trash-outline" style="font-size: 20px"/></Button>
          <!--<Icon type="ios-create-outline" style="font-size: 20px;cursor: pointer;" @click=""/>-->
          <!--<Icon type="ios-trash-outline" style="font-size: 20px" @click=""/>-->
        </div>
      </div>
      <div class="myspan myspan4" style="padding-left: 5%;margin-top: 15px;padding-bottom: 17px">基地权限：{{orgpermission.foudationpermission}}</div>
    </template>
  </div>
  <editOrgMode/>
</div>
</template>
<script>
  import editOrgMode from "@/components/page/editOrgMode.vue";
  export default {
    name: 'orgPermission',
    components: {
      editOrgMode,
    },
    data() {
      return {
        isshoworgpermission:false,
        orgpermission:{
          orgname:'机械检验科-科室',
          affiliatedorg:'格力-集团-珠海总部分厂',
          materialorgpermission:'电机，风管机，压缩机',
          foudationpermission:'全部权限 '
        },
      }
    },
    methods:{
      isempty(str){
        return str == null ||str==""?true:false;
      },
      isshoweditorgbtn(){
        this.isshoworgpermission=this.isempty(this.orgpermission.materialorgpermission) && this.isempty(this.orgpermission.foudationpermission)?true:false;
      }
    },
    mounted() {
      this.isshoweditorgbtn();//todo write in ending of getdataapi
    }
  }
</script>
<style>

</style>
