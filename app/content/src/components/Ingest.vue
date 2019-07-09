<template>
  <div class="ingest m-content">
    <h2>Create Content from PDF</h2>
    <div class="ingest-form">
      <h3>URL of Content to load (e.g. "https://www.engageny.org/file/...-student.pdf?token=..."):</h3>
      <input v-model="local_url" @keyup="handle_keyup"/>
      <br><button @click="handle_submit">Load</button>
      <h3 v-if="page_thumbnails.length>0">Content Preview:</h3>
      <div class="thumbnail-container">
        <img v-for="(url,index) in page_thumbnails" :src="url" alt="Thumbnail Image" :key="index"/>
      </div>
      <div v-if="hash" class="stage_two">
        <h3>List of Pages to Import (default &rarr; all):</h3>
          <input v-model="page_list" />
          <br><button @click="handle_segment">Process</button>
      </div>
      <div v-if="image_dpi>0" class="stage_three">
        <h3>Concatenated Image:</h3>
        <SegmentUI :prop_content_image="content_image"
                    :prop_hash="hash"
                    :prop_image_dpi="image_dpi"
                    :prop_image_size="image_size"
                    :prop_white_space_rows="white_space_rows"
                    >
        </SegmentUI>
        <!--
          <div class="segmentation-container">
            <img :src="content_image" />
          </div>
          <br><button>Upload (coming soon!)</button>
          -->
      </div>
      <error-reporter/>
      <!-- The error-reporter component component supercedes the below -->
      <!-- <div class="errors">
        <h2 v-if="reported_errors.length>0">Errors:</h2>
        <ol v-for="(msg,index) in reported_errors" :key="index">
        <li> {{msg.trim()}}</li>
        </ol>
      </div> -->
    </div>
    <loading :active.sync="show_spinner"></loading>
    <div>
    </div>
      <!-- <loading :active.sync="true"
              :can-cancel="true"
              :on-cancel="onCancel"
              :is-full-page="true"></loading> -->
  </div>
</template>

<script lang="ts" src="./ingest.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.ingest {
  position: relative;
  .errors {
    color: red;
    text-align:left;
    h2 {margin-bottom: 2px;}
    ol {margin-top: 0px; margin-left:20px;font-size: 20px;}
  }
  .ingest-form {
    display: block;
    width: 98%;
    //font-size: 14px;
    padding-bottom: 20px;
    input {
      width:100%;
      font-size: 14pt;
    }
    button {
      display: block;
      margin-top: 20px;
      border: none;
      font-size: 14pt;
      border-radius: 10px;
      padding: 5px 15px 8px 15px;
      color: $white;
      background-color: $wm_green;
    }
    .thumbnail-container {
      img {
        display: inline-block;
        text-align: left;
        //margin-left: 25px;
        margin-top: 40px;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>




