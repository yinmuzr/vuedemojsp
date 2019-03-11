<template>
  <div>
    <Modal
      :title="modeltitle"
      v-model="idshoweditusermode" draggable>
      <Form style="margin-right: 5%" ref="userform" :model="userform" :rules="userrules" :label-width="80">
        <FormItem label="所属组织" prop="affiliatedorg">
          <Input v-model="userform.affiliatedorg" disabled placeholder="所属组织"/>
        </FormItem>
        <FormItem label="人员名称" prop="username">
          <Input v-model="userform.affiliatedorg" placeholder="人员名称"/>
        </FormItem>
        <FormItem label="物料权限" prop="materialorgpermission">
          <div class="mydiv2">
            <Select
              v-model="userform.materialorgpermission"
              filterable
              remote
              multiple
              :remote-method="GetMaterialListByCode"
              :loading="loadingmaterialpermission">
              <Option v-for="(materialpermission, index) in materialpermissionlist" :value="materialpermission" :key="index">{{materialpermission}}</Option>
            </Select>
          </div>
          <Checkbox v-model="materialorgcheckall">加入全部物料组</Checkbox>
        </FormItem>
        <FormItem label="角色" prop="role">
          <Select v-model="userform.role" clearable style="">
            <Option v-for="roleitem in roleList" :value="roleitem" :key="roleitem">{{ roleitem }}</Option>
          </Select>
        </FormItem>
        <!--<FormItem>-->
        <!--<Button type="primary" @click="handleSubmit('formCustom')">提交</Button>-->
        <!--<Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>-->
        <!--</FormItem>-->
      </Form>
    </Modal>

  </div>
</template>
<script>

  export default {
    name: 'editUserMode',
    data() {
      return {
        idshoweditusermode:false,
        modeltitle:'配置本组织权限',
        userform: {
          affiliatedorg: '',
          username:'',
          materialorgpermission: '',
          role:''
        },
        materialorgcheckall:false,
        foudationcheckall:false,
      }
    },
    methods: {

    }
  }
</script>
<style>

</style>
