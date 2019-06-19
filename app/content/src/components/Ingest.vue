<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <!-- this your place to play -->
      <div class="ingest">
        <h1 class="banner">Create Content from PDF</h1>
        <div class="ingest-form">
          <h2 class="label">URL of Content to load (e.g. "https://www.engageny.org/file/...-student.pdf?token=..."):</h2>
          <input v-model="url" @keyup.enter.native="handle_submit"/>
          <br><button @click="handle_submit">Load</button>
          <div class="thumbnail-container">
            <img v-for="url in page_thumbnails" :src="url" alt="Thumbnail Image" />
          </div>
          <br><button @click="handle_segment">Segment</button>
          <div class="errors">
            <h2 v-if="reported_errors.length>0">Errors:</h2>
            <ol v-for="msg in reported_errors">
            <li> {{msg.trim()}}</li>
            </ol>
          </div>
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
    display: block;
    margin: 50px 0 0 25px;
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
    width: 100%;
  }
  h2 {
    text-align: left;
    margin-left: 25px;
    margin-bottom: 10px;
  }
  .errors {
    color: red;
    text-align:left;
    h2 {margin-bottom: 2px;}
    ol {margin-top: 0px; margin-left:20px;font-size: 20px;}
  }
  .ingest-form {
    display: block;
    width: 90%;
    font-size: 14px;
    input {
      margin-left: 25px;
      width:100%;
    }
    button {
      display: block;
      margin-left: 25px;
      margin-top: 40px;
      font-size: 18px;
    }
    .thumbnail-container {
      img {
        display: block;
        margin-left: 25px;
        margin-top: 40px;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>




