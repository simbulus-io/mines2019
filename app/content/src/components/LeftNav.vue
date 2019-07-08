<template>
  <div class="left-nav">
    <h2>Available Content</h2>
    <hr/>
    <div class="filter-wrapper">
      <div class="filter-row">
        <div class="input-header">
          <h3>Filter On: </h3>
        </div>
        <div class="filter-input">
          <select v-model="filter_selection">
              <option v-for="option in filter_options" :key="option">{{option}}</option>
          </select>
        </div>
      </div>
    </div>
    <h4>{{num_filter_lessons}} <span class="pop-color">{{filter_selection}}</span> lesson<span v-show="num_filter_lessons!==1">s</span></h4>
    <hr/>
    <json-view
      :data="create_tree"
      v-on:selected="itemSelected"
      :rootKey="'Content Providers'"
      :filter="filter_selection"
      :filter_cat="filter_category"/>
  </div>
</template>

<script lang="ts" src="./left_nav.ts"></script>

<style scoped lang="scss">
@import "../styles/common.scss";
.pop-color {
  color: $wm_bright_blue;
}
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

  .filter-wrapper {
    display: table;
    width:100%;
    .filter-row {
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

      .filter-input {
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
    background-color: $light_gray;
    z-index: -1;
  }
  router-link {
    color: $white;
  }
  .link-container {
    width: $left_nav_width;
    margin: 0 auto;
    margin-left: 43px;
    margin-top: 40px;
    svg {
      margin-right: 8px;
    }
    a {
      display: block;
      margin: 20px 0 20px 0;
      color: $lighter_gray;
      text-align: left;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
    }
    .router-link-active { color: $white; }
  }
}
</style>
