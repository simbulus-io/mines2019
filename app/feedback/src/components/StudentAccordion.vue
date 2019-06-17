<template>
   <div class="accordion">
        <div class="tab__header">
            <a href="#" class="tab__link p-4 block bg-blue-dark hover:bg-blue-darker no-underline text-white border-b-2 border-white flex justify-between" @click.prevent="active = !active">
                <span class="title"><strong>{{assignment_title}}</strong></span>
                <span class="down-arrow" v-show="!active">&#9660;</span>
                <span class="up-arrow" v-show="active">&#9650;</span>
            </a>
        </div>
            <router-link :to="{ name: 'studentassignment', params: { idx: assign_idx } }">
                <div class="tab__content" v-show="active">
                    <div class="assign-img">
                        <!-- <span class="bgimg" v-bind:style="{'background-image': 'url(' + assignment_url +')'}"></span> -->
                        <img v-bind:src="assignment_url" :alt="assignment_title+' worksheet. Can\'t find '+assignment_url" width="80%">
                    </div>
                    <div class="assign-snotes">
                        <snote-slug v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.idx" />
                        <p v-show="no_snotes">You currently have no feedback for this assignment.</p>
                    </div>
                </div>   
            </router-link>         
        </div>
</template>

<script lang="ts" src="./studentaccordion.ts">

</script>
<style scoped lang="scss">
@import "../styles/common.scss";
.tab__header {
    background-color: $wm_green;
}

.assign-snotes{
    width:75%;
    text-align: left;
}
.assign-img{
    width:25%;
    max-height: 25%;
    vertical-align: top;
    background-size:contain;
}
</style>