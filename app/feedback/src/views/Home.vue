<template>
  <div class="home">
    <TopNav/>
    <LeftNav/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue'; // @ is an alias to /src
import LeftNav from '@/components/LeftNav.vue'; // @ is an alias to /src
@Component({
  components: {
    TopNav,
    LeftNav,
  },
})
export default class Home extends Vue {

}
</script>
