<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <!-- this your place to play -->
      <div class="ingest">
        <div class="banner">Hello RBM</div>
        <div class="ingest-form">
          <input v-model="url" @keyup.enter.native="handle_submit"/>
          <br><button @click="handle_submit">Submit</button>
        </div>
      </div>
    </template>
  </MainContent>
</template>

<script lang="ts" src="./ingest.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.ingest {
  position: relative;
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
  .ingest-form {
    display: block;
    width: 900px;
    font-size: 10px;
    margin: 20px;
    input: {
      margin: 25px;
      width:90%;
    }
  }
}
</style>




