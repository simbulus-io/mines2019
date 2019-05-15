<template>
  <div id="wmtutor-app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>
<script lang="ts" src="./app.ts"></script>

<style lang="scss">
@import "@/styles/common.scss";

#wmtutor-app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $light_gray;
  height:100vh;
  min-height:500px;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
