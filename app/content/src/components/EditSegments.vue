
<template>
  <MainContent>
    <!-- (v-slot) transclude to the main-content slot -->
    <template v-slot:main-content>
      <h1>W00t Math Digital Content Editor</h1>
      <span>Edit, tag, accept/reject!: </span><br><br>
      <div v-for="elem in test_array" v-bind:key="elem">
           <!-- <p style="white-space: pre-line;">{{elem.name}}</p>-->
            <textarea name="math_problem" rows="18" cols="70" v-model="elem.name"></textarea><br><br>
            <input type="checkbox" name="arithmetic" value="is_arithmetic">Arithmetic
            <input type="checkbox" name="division" value="is_division">Division
            <input type="checkbox" name="multiplication" value="is_multiplication">Multiplication
            <input type="checkbox" name="decimals" value="is_decimals">Decimals<br><br>
            <input type="checkbox" name="fractions" value="is_fractions">Fractions
            <input type="checkbox" name="algebra" value="is_algebra">Algebra
            <input type="checkbox" name="exponents" value="is_exponents">Exponents
            <input type="checkbox" name="irrationals" value="is_irrationals">Irrationals<br><br>
            <input type="checkbox" name="geometry" value="is_geometry">Geometry
            <input type="checkbox" name="logarithms" value="is_logarithms">Logarithms 
            <input type="checkbox" name="complex_numbers" value="is_complex_numbers">Complex Numbers<br><br>
            <input type="checkbox" name="trig" value="is_trig">Trigonometry
            <input type="checkbox" name="calculus" value="is_calculus">Calculus<br><br>
            <input type="radio" name="save" value="keep" checked> Save it!
            <input type="radio" name="save" value="discard"> Forget it!<br><br>
            <button @click="on_submit">Submit!</button><br><br>
      </div>
    </template>
  </MainContent>
</template>

<script lang="ts" src="./edit_segments.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common.scss";
.other {
  position: relative;
  $left_margin: 60px;
  margin: 0 auto;
  text-align: left;
  min-width: 900px;
}
</style>
