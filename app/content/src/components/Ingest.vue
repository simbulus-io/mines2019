<template>
  <div class="ingest m-content">
    <h2>Create Content from PDF</h2>
    <div class="ingest-form">
      <h3>URL of Content to load (e.g. "https://www.engageny.org/file/...-student.pdf?token=..."):</h3>
      <input v-model="local_url" @keyup="handle_keyup"/>
      <br><button @click="handle_submit">Load</button>
      <h3 v-if="page_thumbnails.length>0">Content Preview:</h3>
      <div class="thumbnail-container">
        <div class="thumbnail-image"
          v-for="(url,index) in page_thumbnails"
          :key="index"
          @click="toggle_page_selection(index+1)">
          <div v-show="!in_page_list(index+1)" class="thumbnail-overlay not-selected"><span><font-awesome-icon icon="times-circle" /></span></div>
          <img :src="url" :alt="`Thumbnail Image ${index}`"/>
        </div>
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
      .thumbnail-image {
        display: inline-block;
        text-align: left;
        margin: 10px;
        border: 1px solid #ccc;
        position: relative;
        .thumbnail-overlay {
          position: absolute; 
          bottom: 0; 
          width: 100%;
          height: 100%;
          text-align: center;
          color:rgba(119, 119, 119, 0.7);
          font-size: 5vw;
          display: flex;
          align-content: middle;
          justify-content: center;
          flex-direction: column;
        }
        .thumbnail-overlay.not-selected {
          background-color: rgba(119, 119, 119, 0.5);
        }
      }
      
    }
  }
}
</style>




