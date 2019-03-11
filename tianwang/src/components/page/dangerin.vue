<template>
  <div>
           <orgPermission/>
           <userTable/>
    </div>
</template>
<script>
  import userTable from "@/components/page/userTable.vue";
  import orgPermission from "@/components/page/orgPermission.vue";

  export default {
    name: 'SkynetHierachyorgMemu',
    components: {
      userTable,orgPermission,
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>
<style>

</style>
