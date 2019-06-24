<template>
   <div class="accordion">
        <div class="tab__header">
            <a href="#" class="tab__link p-4 block bg-blue-dark hover:bg-blue-darker no-underline text-white border-b-2 border-white flex justify-between" @click.prevent=" active=!active ">
                <span class="title"><strong>{{assign_title}}</strong></span>
                <span class="down-arrow" v-show="!active">&#9660;</span>
                <span class="up-arrow" v-show="active">&#9650;</span>
            </a>
        </div>
            <div class="tab__content" v-show="active">
                <assignment-thumb v-for="assign in assignments" :assign_idx="assign.idx" :key="assign.idx"/>
            </div>            
        </div>
</template>

<script lang="ts" src="./teacheraccordion.ts">

</script>
<style scoped lang="scss">
@import "../styles/common.scss";
$accordion_height: 60px;
.tab__header {
    background-color: $wm_blue;
}
.tab__content {
    background-color: $wm_bright_blue;
}
</style>