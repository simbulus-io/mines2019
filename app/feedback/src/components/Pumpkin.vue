
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>

      <div id="app">
        <accordion v-for="assignment in sNoteEle" :key=assignment.assignment :title=assignment.assignment :content=assignment.details :image=assignment.image>

        </accordion>
        <!--<accordion title="Alucard">
          <p class="pb-5">frankenstein</p>

        </accordion>    
        <accordion title="Sypha Belnades">
          <p class="pb-5">werewolf</p>

        </accordion>   -->
      </div>

      <!-- <VueFaqAccordion
        :items="trick"
      /> -->

      <!-- <div id="patch">
        <img src="./pumpkinVector.png">
      </div> -->

    </template>
  </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./pumpkin.ts"></script>

<!----
<script src="../node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script>
<script src="../node_modules/@ckeditor/ckeditor5-vue/dist/ckeditor.js"></script>
-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.other {
  position: relative;
  $left_margin: 60px;
  margin: 0 auto;
  text-align: left;
  min-width: 900px;
  .banner {
    display: inline-block;
    margin: 50px 0 0 $left_margin;
    font-size: 30px;
    font-weight: 300;
    line-height: 36px;
    text-align: left;
    user-select: none;
    color: rgb(162, 0, 255);
    max-width: calc(100% - 320px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>