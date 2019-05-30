
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <div class="other">
        <span class="banner"> Hello You </span>
      </div>
      <!-- displaying background image and toolbar-->
      <div class = "background" v-bind:style="{ 'backgroundImage': 'url('+ bgimage +')' }">
       <div class = "toolbar">
        <button-toolbar key-nav aria-label="Toolbar with button groups" >
          <button @click= "OnClick" class="button">
            <button>Sticky Note</button>
            <button>Annotate</button>
            <button>Highlight</button>
            <button>equations</button>
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
  position: absolute;
  bottom: 0;
  left: 25%;
}
}


</style>
