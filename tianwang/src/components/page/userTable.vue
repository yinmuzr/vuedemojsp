<template>
  <div>
    <div style="height: 90px">
      <div class="mydiv4" style="margin-top: 46px;"></div>
      <div class="myspan myspan1" style="margin-top: 42px;">人员权限</div>
      <Button type="primary"  @click="addbtnmethod" icon="md-add" class="mybtn1">新增用户</Button>
    </div>
    <div class="mydiv5">
  <Table :loading="usertableloding" :columns="usercolumns" :data="userlist" stripe></Table>
  </div>
    <editUserMode/>
  </div>
</template>
<script>
  import editUserMode from "@/components/page/editUserMode.vue";

  export default {
    name: 'userTable',
    components: {
      editUserMode,
    },
    data() {
      return {
        usertableloding:false,
        usercolumns:[{
          title: '用户姓名',
          key: 'Username',
          tooltip:true,
          minWidth:28
        },
          {
            title: '部门',
            key: 'Userdepartment',
            tooltip:true,
            minWidth:8
          },
          {
            title: '科室',
            key: 'Useroffice',
            tooltip:true,
            minWidth:8
          },
          {
            title: '物料权限',
            key: 'Martrialpermission',
            tooltip:true,
            minWidth:28
          },
          {
            title: '对应角色',
            key: 'role',
            tooltip:true,
            minWidth:28
          },
          {
            title: '操作',
            key: 'action',
            minWidth:31,
            maxWidth:100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button',{
                  props: {
                    size: 'small'
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
    }
  }
</script>
<style>

</style>
