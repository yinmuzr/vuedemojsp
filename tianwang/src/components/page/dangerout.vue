<template>
  <div>
    <Content class="main-container">
      <div class="layout main-content">
        <Row class="container">
          <Col :span="7" class="layer-panel">
          <SkynetorgTree></SkynetorgTree>
          </Col>
          <Col :span="17">
          <SkynetHierachyorgMemu/>
          </Col>
        </Row>
      </div>
    </Content>

  </div>
</template>
<script>
  import SkynetHierachyorgMemu from "@/components/page/dangerin.vue"
  export default {
    name: 'dangerout',
    data() {
      return {
        number: 8
      }
    },
    components: {
//      SkynetHierachyTree,
      SkynetHierachyorgMemu,
    }
  }
</script>
<style>
  @import "../../assets/organduser.css";
  .layer-panel{
    background-color: #f9fbfd;
    min-height: 616px;
    /*overflow: scroll;*/
  }
  .main-container{
    padding-left: 15%;
    padding-right: 15%;
        padding-top :20px;
        padding-bottom: 190px;
        background-size: 216px 28px;
        background-position: center bottom 106px
  }
 .main-content{
  background: #fff;
  min-height: 616px;
   min-width: 700px;
  }
</style>
