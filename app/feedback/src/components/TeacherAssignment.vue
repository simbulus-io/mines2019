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
      <div class = "buttontoolbar" >
       <div key-nav aria-label="Toolbar with button groups" name="Feedback Toolbar">

        <button class="button" title="Add Note" v-on:click="create_snote">
          <font-awesome-icon icon="sticky-note" color="rgba(105, 105, 105,1.0)"/>
          </button>
        <button class="button" title="Annotate" v-on:click="create_annotation()">
          <font-awesome-icon icon="pen" color="rgba(105, 105, 105,1.0)"/>
        </button>
        <button class="button" title="Erase Annotation" v-on:click="erase()">
          <font-awesome-icon icon="eraser" color="rgba(105, 105, 105,1.0)"/>
        </button>
        <button class="button" title="Save Annotations" v-on:click="save_annotations()">
          <font-awesome-icon icon="save" color="rgba(105,105,105,1.0)"/>
        </button>
        <button class="button" title="Clear All Annotations" v-on:click="clear_all_annotations()">
          <font-awesome-icon icon="bomb" color="rgba(105,105,105,1.0)"/>
        </button>
        <button class="button" title="Return to Pointer" v-on:click="pointer()">
          <font-awesome-icon icon="mouse-pointer" color="rgba(105, 105, 105,1.0)"/>
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
    color: #555;
    max-width: calc(100% - 320px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
.transparent{
  z-index: 10;
  opacity: 0;
}
   .button {
     z-index: 4;
     background: #ffffff;
     border-radius: 3px;
     border: none;
     font-family: Arial;
     color: #000000;
     font-size: 12px;
     padding: 2px 2px 2px 2px;
     text-decoration: none;
     height: 30px;
     width: 30px;
     margin-top: 5px;
     margin-left: 2px;
     margin-right: 2px;
     margin-bottom: 5px;
     // display: block;
 }

.buttontoolbar {
 position: fixed;
 bottom: 0;
 z-index: 3;
 background: #435ebc;
// box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
 box-shadow: 0 0 8px #000;
 border: none;
 border-radius: 3px;
}

.button.active {
    background: #cecece;
    text-decoration: none;
}

}


</style>
