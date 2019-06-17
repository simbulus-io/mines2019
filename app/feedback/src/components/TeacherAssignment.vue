<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="main-layout">
        <span class="banner"> {{student_name}}'s Assignment: {{assignment_title}}</span>
      </div>

      <router-link to="/teacher/slug">
        <button class="assigns-button" title="Return to All Assignments">Return to All Assignments</button>
      </router-link>

      <div class="buttontoolbar" >
       <div key-nav aria-label="Toolbar with button groups" name="Feedback Toolbar">

        <button class="toolbar-button-wrapper" title="Add Note" v-on:click="create_snote">
          <font-awesome-icon icon="sticky-note"/>
          </button>
        <button class="toolbar-button-wrapper" title="Annotate" v-on:click="create_annotation()">
          <font-awesome-icon icon="pen" color="#HG567F"/>
        </button>
        <button class="toolbar-button-wrapper" title="Erase Annotation" v-on:click="erase()">
          <font-awesome-icon icon="eraser"/>
        </button>
        <button class="toolbar-button-wrapper" title="Save Annotations" v-on:click="save_annotations()">
          <font-awesome-icon icon="save" />
        </button>
        <button class="toolbar-button-wrapper" title="Clear All Annotations" v-on:click="clear_all_annotations()">
          <font-awesome-icon icon="bomb"/>
        </button>
        <button class="toolbar-button-wrapper" title="Return to Pointer" v-on:click="pointer()">
          <font-awesome-icon icon="mouse-pointer"/>
        </button>
       </div>
     </div>
     <div class="graphbackground">
        <div class="bgimg" v-bind:style="{'background-image': 'url(' + image_path +')'}">          
            <DrawingBoard :clickerMode="clickerMode"></DrawingBoard>
          <snote v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.note"/>
        </div>
     </div>
    </template>
  </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./teacherassignment.ts"></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
$button-size: 30px;
$toolbar-width: 32%;
$toolbar-height: 48px;

.toolbar-button-wrapper {
  border-radius: 3px;
  z-index: 4;
  background: $white;
  border: none;
  color: $wm_purple;
  font-size: $button-size;
  //color: $icon-colour;
  padding: 2px 2px 2px 2px;
  text-decoration: none;
  height: 100%;
  width: 15%;
  margin-top: 5px;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 5px;
}

.toolbar-button-wrapper:hover {
  background: $wm_green;
  color: $wm_blue;
}

.toolbar-button-wrapper:focus {
  background: $wm_green;
  color: $wm_blue;
  //text-decoration: none;
}

.buttontoolbar {
  position: fixed;
  bottom: 0;
  z-index: 3;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 0 8px #000;
  border: none;
  border-radius: 3px;
  width: $toolbar-width;
  text-align:center;
  height: $toolbar-height;
  background-color:$wm_gray;
}

</style>
