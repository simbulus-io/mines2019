
<template>
  <MainContent>
                

    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>

      <div class="other">
        <span class="banner"> {{get_student.name}}'s Assignment: {{get_assignment.title}} </span>
      </div>
      <!-- Links to the symbols for the toolbar buttons -->
      <!-- TODO: why do these font aweomse incons needs to be like this? Why isn't <font-awesome-icon icon="icon-name"/> working here? -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

      <router-link to="/teacher/slug">
        <button class="button" title="Return to All Assignments">Return to All Assignments</button>
      </router-link>

      <hr/>
      
<DrawingBoard></DrawingBoard>
 
           
      <span class="bgimg" v-bind:style="{'background-image': 'url(' + get_image_path +')'}">
                    

        <snote v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.get_note"/>
      </span>

      <div class = "toolbar">
       <button-toolbar  key-nav aria-label="Toolbar with button groups" name="Feedback Toolbar">
        <button class="button" title="Add Comment" v-on:click="create_snote"><i class ="fa fa-sticky-note" ></i></button>
        <!-- <button class="button" title="Add Sticky Note" v-on:click="create_snote">
          <font-awesome-icon icon="fa fa-sticky-note"/>
        </button> -->
        <button class="button" title="Annotate" ><i class ="fa fa-pencil"></i></button>
        <button class="button" title="Return to Pointer" onclick="pointer()"><i class ="fa fa-mouse-pointer"></i></button>
       </button-toolbar>
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

body {
  margin: 2rem;
  background: #eee;
}


canvas {
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  z-index: 10;
  opacity: 0.5;
}

</style>
