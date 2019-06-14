<template>
  <MainContent>
                

    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="other">
        <span class="banner"> {{student_name}}'s Assignment: {{assignment_title}}</span>
      </div>
      <router-link to="/teacher/slug">
        <button class="button" title="Return to All Assignments">Return to All Assignments</button>
      </router-link>

      <hr/>
      <div class="buttontoolbar" >
       <div key-nav aria-label="Toolbar with button groups" name="Feedback Toolbar">

        <button class="toolbar-button-wrapper" title="Add Note" v-on:click="create_snote">
          <font-awesome-icon icon="sticky-note" color="#444444"/>
          </button>
        <button class="toolbar-button-wrapper" title="Annotate" v-on:click="create_annotation()">
          <font-awesome-icon icon="pen" color="#444444"/>
        </button>
        <button class="toolbar-button-wrapper" title="Erase Annotation" v-on:click="erase()">
          <font-awesome-icon icon="eraser" color="#444444"/>
        </button>
        <button class="toolbar-button-wrapper" title="Save Annotations" v-on:click="save_annotations()">
          <font-awesome-icon icon="save" color="#444444"/>
        </button>
        <button class="toolbar-button-wrapper" title="Clear All Annotations" v-on:click="clear_all_annotations()">
          <font-awesome-icon icon="bomb" color="#444444"/>
        </button>
        <button class="toolbar-button-wrapper" title="Return to Pointer" v-on:click="pointer()">
          <font-awesome-icon icon="mouse-pointer" color="#444444"/>
        </button>

       </div>
     </div>
      <div class="bgimg" v-bind:style="{'background-image': 'url(' + image_path +')'}">
                    
          <DrawingBoard></DrawingBoard>

        <snote v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.note"/>
      </div>

 
    </template>
  </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./teacherassignment.ts"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.bgimg {
    background-position: center center;
    position:relative;
    display:inline-block;
    background-size:contain; // also cover is an option
    background-repeat:no-repeat;
    // background-image: url("../../public/wkst.jpg");
    // //background-image: url("../../public/kitten.jpg");
    background-repeat: no-repeat;
    min-height: 500px;
    width: 1024px;
    height: 768px;
    // user-select: none;
    // -webkit-user-select: none;
    // -o-user-select: none;
    
    
}
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
    color: $wm_gray;
    max-width: calc(100% - 320px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .transparent{
    z-index: 10;
    opacity: 0;
  }
  .toolbar-button-wrapper {
    z-index: 4;
    background: $white;
    border-radius: 3px;
    border: none;
    font-family: Arial;
    color: $wm_gray;
    font-size: 12px;
    padding: 2px 2px 2px 2px;
    text-decoration: none;
    height: 60px;
    width: 60px;
    margin-top: 5px;
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 5px;
    font-awesome-icon {
      color: red;
    }
    // display: block;
  }

  .buttontoolbar {
  position: fixed;
  bottom: 0;
  z-index: 3;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 0 8px #000;
  border: none;
  border-radius: 3px;
  }

  .button.active {
      background: $white;
      text-decoration: none;
  }

}


</style>
