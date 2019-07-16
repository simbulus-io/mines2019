<template>
  <div class="left-nav">
    <h2>Available Content</h2>
    <hr/>
    <div class="highlight-wrapper">
      <div class="highlight-row">
        <div class="input-header">
          <h3>Highlight On: </h3>
        </div>
        <div class="highlight-input">
          <select v-model="highlight_selection">
              <option v-for="option in highlight_options" :key="option">{{option}}</option>
          </select>
        </div>
      </div>
    </div>
    <h4>{{num_highlight_lessons}} <span class="pop-color">{{highlight_selection}}</span> lesson<span v-show="num_highlight_lessons!==1">s</span></h4>
    <hr/>
    <json-view
      :data="create_tree"
      v-on:selected="itemSelected"
      :rootKey="'Content Providers'"
      :highlight="highlight_selection"
      :highlight_cat="highlight_category"
      :maxDepth="2"/>
    <hr/>
    <button type="button" class="left-nav-button" @click="select_nothing">Other Lesson</button>
  </div>
</template>

<script lang="ts" src="./left_nav.ts"></script>

<style scoped lang="scss">
@import "../styles/common.scss";

.left-nav {
  position: absolute;
  top: $top_nav_height;
  height: 100vh; // 100% view height
  left: 0;
  bottom: 0;
  width: $left_nav_width;
  min-width: 300px;
  color: $white;
  background-color: $wm_gray;

  hr {
    height: 2px;
    border: none;
    color: $dark_gray;
    background-color: $dark_gray;
    margin: 5px 0px;
  }

  .highlight-wrapper {
    display: table;
    width:100%;
    .highlight-row {
      display: table-row;
      width:100%;
      .input-header {
      display: table-cell;
      width: 30%;
      vertical-align: middle;
      padding: 0px 10px;
      margin: 0px;
      text-align:left;
        h3 {
          display: inline;
          margin: 0px;
        }
      }

      .highlight-input {
        display: table-cell;
        width: 70%;
        vertical-align: middle;
        select {
          margin-right: 10px;
          font-size: 14pt;
          width: 100%;
          float: right;
        }
      }
    }
    
  }
  
  h2, h3, h4 {
    color: $white;
    text-align: left;
    margin-left: 10px;
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 5px;
  }
  // This stripe is fixed in the window - so it follows the scroll
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: $left_nav_width;
    background-color: $wm_gray;
    z-index: -1;
  }

  .left-nav-button {
    font-size: 14pt;
    margin: 5px;
    padding: 5px 10px;
    border-radius: 10px;
    border: none;
    background-color: $white;
    width: 67%;
  }
}
</style>
