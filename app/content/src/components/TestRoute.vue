
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="upload">
        <h1 class="banner">W00t Math Content Digitzer</h1>
          <span>Select file to upload (.jpg, .png, .pdf), should you so desire: </span><br>
            <input type="file" id="file_upload" accept=".jpg,.png,.pdf" @change="on_file_selected"><br><br>
            <button @click="on_upload">Upload!</button><br><br>
            <!--this img loads from /public via the test_image route-->   
            <img v-bind:src="test_image">
      </div>
    </template>
  </MainContent>
</template>

<script lang="ts" src="./test_route.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.test-route {
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
    color: #555;
    max-width: calc(100% - 320px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
