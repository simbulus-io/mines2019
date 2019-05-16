<template>
  <div class="nav">
    <TopNav/>
    <LeftNav/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue';
import LeftNav from '@/components/LeftNav.vue';
@Component({
  components: {
    TopNav,
    LeftNav,
  },
})
export default class Nav extends Vue {

}
</script>
