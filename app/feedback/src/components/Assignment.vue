
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="other">
        <span class="banner"> An Assignment </span>
      </div>
        <!-- Links to the symbols for the toolbar buttons -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <div class = "toolbar">
       <button-toolbar  key-nav aria-label="Toolbar with button groups" name="Feedback toolbar">
        <button class="button" title="Add Comment" v-on:click="create_snote"><i class ="fa fa-plus" ></i></button>
        <button class="button" title="Annotate" ><i class ="fa fa-pencil"></i></button>
        <button class="button" title="Return to Pointer" onclick="pointer()"><i class ="fa fa-mouse-pointer"></i></button>
       </button-toolbar>
     </div>

      <div class="bgimg" v-bind:style="{'background-image': 'url(' + get_image_path +')'}">
        <snote v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.get_note"/>
      </div>

    </template>
  </MainContent>
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./assignment.ts"></script>


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

</style>
