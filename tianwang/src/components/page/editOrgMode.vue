<template>
  <div>
    <Modal
      :title="modeltitle"
      v-model="idshowedituorgmode" draggable>
      <Form style="margin-right: 5%" ref="orgform" :model="orgform" :rules="orgrules" :label-width="80">
        <FormItem label="所属组织" prop="affiliatedorg">
          <Input v-model="orgform.affiliatedorg" disabled placeholder="所属组织"/>
        </FormItem>
        <FormItem label="物料权限" prop="materialorgpermission">
          <div class="mydiv2">
            <Select
              v-model="orgform.materialorgpermission"
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
        <FormItem label="基地权限" prop="foudationpermission">
          <div class="mydiv2">
            <Tree :data="orgform.foudationpermission" show-checkbox></Tree>
          </div>
          <Checkbox v-model="foudationcheckall">基地权限</Checkbox>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: "editOrgMode",
    data() {
      return {
        idshowedituorgmode: false,
        modeltitle: "配置本组织权限",
        orgform: {
          affiliatedorg: "",
          materialorgpermission: "",
          foudationpermission: []
        }
      };
    }
  };
</script>
