<template>

  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="other">
        <span class="banner"> Hello You </span>
      </div>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

      <!-- displaying background image and toolbar-->
      <div class = "background" v-bind:style="{ 'backgroundImage': 'url('+ bgimage +')' }">
      <h1>hello</h1>
      <div v-for="item in items" v-bind:key= "item">
        {{item}}
        </div>
       <div class = "toolbar">
        <button-toolbar  key-nav aria-label="Toolbar with button groups" >
          <button @click= "onClick" class="buttontoolbar">
            <button class="button" title="Add Comment" onclick="myFunction()"><i class ="fa fa-plus" ></i></button>
            <!-- <p id="demo" class="demo">Click me</p> -->
            <!-- <div id="myDIV">
              <p id ="demo" class = "paragraph">Work</p>
            </div> -->
            <button class="button" title="Annotate" onclick="richText()"><i class ="fa fa-pencil"></i></button>
            <button class="button" title="Return to Pointer" onclick="pointer()"><i class ="fa fa-mouse-pointer"></i></button>
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

<!--
  // function toggleActiveState() {
  //     this.classList.toggle('active');
  // }
 // function myFunction() {
  // document.getElementById("demo").innerHTML="Hello World";
  // document.getElementById("demo").style.visibility="visible";
  // document.getElementById("demo").style.zindex="7";
  // log.info('Hello');
  // }
  //   function myFunction() {
  //   document.getElementById('myDIV').style.display = "block";
  // }
  -->

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
  z-index: 1;
  width: 520px;
  height: 420px;
  background-size:contain; 
  background-repeat:no-repeat;
  position: relative;

  .toolbar {
  z-index: 2;
  background: #435ebc;
  border-radius: 3px;
  position: absolute;
  bottom: 0;
  left: 45%;
}


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

  .button.active {
      background: #cecece;
      text-decoration: none;
  }
  .buttontoolbar {
  z-index: 3;
  background: #435ebc;
// box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); 
  box-shadow: 0 0 8px #000;
  border: none;
  border-radius: 3px;
 }
 .paragraph {
  background: #435ebc;
  color: #000000;
  position: relative;
  display: inline-block;
  z-index: 1;
 }
#myDIV {
  visibility: hidden;
  display: none;
  border: 1px solid black;
  background-color: lightblue;
  width: 300px;
  height: 300px;
  position: relative;
  top: 20px;
}
.demo {
  visibility: hidden;
  z-index: -1;
}

</style>
