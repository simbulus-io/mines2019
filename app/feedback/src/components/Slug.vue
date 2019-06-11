
<template>
  <div id="app">
    <span class="content">
      <p class="subtitle"> <strong>Vue.js</strong> Component</p>
        <h1 class="title"> Accordion</h1>
        <hr />
        <p> A Vue accordion component using styles provided by the Bulma CSS framework.</p>

      <section class="section">
        <h3> Single Active Item </h3>
        <p> Only one accordion item's details will be displayed at a time. </p>
        <accordion id="accordion-example-1" :content="example1"></accordion>
      </section>

      <section class="section">
        <h3> Multiple Active Items</h3>
        <p> Add the <code>multiple</code> attribute to allow more than one accordion item's details to be showing.</p>
        <accordion id="accordion-example-2" :content="example2" :multiple="true"></accordion>
      </section>
      </span>
  </div>
      <!-- <snote-slug v-for="curr_note in snotes" :note="curr_note" :key="curr_note.idx" /> -->
      <!--<snote-slug v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.idx" />-->
</template>

<!-- Look for the ./other.ts file -->
<script lang="ts" src="./slug.ts"></script>

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

$browser-context: 16;
$blue: #1779ba;
$gray: #cacaca;
$red: #cc4b37;
$white: #ffffff;

@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}

#app {
  margin: em(60) auto;
  padding: em(12);
  max-width: em(800);
}

.container {
  margin-bottom: em(24);
}

.btn-action-delete {
  color: $red;
  cursor: pointer;
}

.accordion {
  padding: 0;
  
  div:not(:last-child) {
    border-bottom: 1px solid rgba(10, 10, 10, 0.1);
  }
  
  div:last-child .accordion-item-details {
    border-radius: 5px;
  }
  
  dd {
    margin-left: 0;
  }
}

.accordion-item-trigger,
.accordion-item-details-inner {
  padding: 0.75rem 1.25rem;
}

.accordion-item-title {
  position: relative;
  
  h4 {
    font-size: 1.25rem;
    margin-bottom: 0;
    padding-right: 1.25rem;
  }
}

.accordion-item-trigger {
  width: 100%;
  text-align: left;
  background-color: transparent;
  border: none;
}

.accordion-item-trigger-icon {
  $size: 8px;
  display: block;
  position: absolute;
  top: 0; right: 1.25rem; bottom: 0;
  margin: auto;
  width: $size;
  height: $size;
  border-right: 2px solid #363636;
  border-bottom: 2px solid #363636;
  transform: translateY(-$size / 4) rotate(45deg);
  transition: transform 0.2s ease;
  
  .is-active & {
    transform: translateY($size / 4) rotate(225deg);
  }
}

.accordion-item-details {
  overflow: hidden;
  background-color: whitesmoke;
}

.accordion-item-enter-active, .accordion-item-leave-active {
  will-change: height;
  transition: height 0.2s ease;
}
.accordion-item-enter, .accordion-item-leave-to {
  height: 0 !important;
}
</style>
