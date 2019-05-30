<template>

  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <!-- <head>
        <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
        <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
      </head> -->
      

      <div class="other">
        <span class="banner"> Hello You </span>
      </div>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

      <!-- displaying background image and toolbar-->
      <div class = "background" v-bind:style="{ 'backgroundImage': 'url('+ bgimage +')' }">
       <div class = "toolbar">
        <button-toolbar  key-nav aria-label="Toolbar with button groups" >
          <button @click= "OnClick" class="buttontoolbar">
            <button class="button"><i class ="fa fa-plus" title="Edit"></i></button>
            <button class="button"><i class ="fa fa-pencil" title="Edit"></i></button>
            <button class="button">highlighter</button>
            <button class="button"><i class ="fa fa-mouse-pointer" title="Edit"></i></button>
          </button> 
        </button-toolbar>
      </div>
       </div>
      <div class = "other">
        <div v-for="curr_name in view_names" :key="curr_name.first_name">
          <p>
            {{curr_name.last_name}}, {{curr_name.first_name}}
            </p>
        </div>
      </div>
      <!-- <BlogPost v-for="blogPost in blogPosts" :post="blogPost" :key="blogPost.first_name" /> -->
    </template>
  </MainContent>
</template>
<script>
              function toggleActiveState() {
                  this.classList.toggle('active');
              }
              var btns = document.querySelectorAll('.btn');
              [].forEach.call(btns, function(btn) {
                btn.addEventListener('click', toggleActiveState, false);
              });
            </script>
<script lang="ts" src="./dashboard.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
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

}
.background {
  width: 1024px;
  height: 768px;
  background-size:contain; 
  background-repeat:no-repeat;
  position: relative;

  .toolbar {
  background: #435ebc;
  border-radius: 3px;
  position: absolute;
  bottom: 0;
  left: 45%;
}


}
  .button {
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

  .button.active {
      background: #cecece;
      text-decoration: none;
  }
  .buttontoolbar {
  background: #435ebc;
// box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); 
  box-shadow: 0 0 8px #000;
  border: none;
  border-radius: 3px;
 }
  


</style>
