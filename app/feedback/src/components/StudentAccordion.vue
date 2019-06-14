<template>
   <div class="accordion">
        <div class="tab__header">
            <a href="#" class="tab__link p-4 block bg-blue-dark hover:bg-blue-darker no-underline text-white border-b-2 border-white flex justify-between" @click.prevent="active = !active">
                <span class="title"><strong>{{assignment_title}}</strong></span>
                <span class="down-Arrow" v-show="!active">&#9660;</span>
                <span class="up-Arrow" v-show="active">&#9650;</span>
            </a>
        </div>
            <router-link :to="{ name: 'studentassignment', params: { idx: assign_idx } }">
                <div class="tab__content" v-show="active">
                    <div class="assign-img">
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
$accordion_height: 60px;
.tab__header {
    width: 96%;
    height: $accordion_height;
    padding: 10px;
    border: none;
    margin: 3px;
    background-color: $wm_green;
    color:$white;
    font-family: sans-serif;
    a{
        color:$white;
    }
}
.tab__header span {
    float: left;
}
.tab__content {
    width: 96%;
    min-height: $accordion_height;
    height: auto;
    background-color: $wm_blue;
    padding: 10px;
    margin: 6px;
    color: white;
    overflow:hidden;
    div{
        display:inline-block;
    }
}
.assign-snotes{
    width:75%;
    font-family: sans-serif;
    text-align: left;
}
.assign-img{
    width:25%;
    max-height: 100px;
    vertical-align: top;
}

.content {
    width:75%;
    height: 80%;
    margin-left: 20%;
    border: 4px;
}

.title {
    width: 78%;
    height: 100%;
    text-align: left;
    padding-left: 2%;
    font-size: 16pt;
}
</style>