<template>
   <div class="accordion">
        <div class="tab__header">
            <a href="#" class="tab__link p-4 block bg-blue-dark hover:bg-blue-darker no-underline text-white border-b-2 border-white flex justify-between" @click.prevent="active = !active">
                <span class="title"><strong>{{assign_title}}</strong></span>
                <span class="down-Arrow" v-show="!active">&#9660;</span>
                <span class="up-Arrow" v-show="active">&#9650;</span>
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
    width: 96%;
    height: $accordion_height;
    padding: 10px;
    // border: none;
    margin: 3px;
    background-color: $wm_blue;
    color: $white;
    a{
        color:$white;
    }
    span {
        float: left;
    }
}
.tab__content {
    width: 96%;
    height: auto;
    background-color: $wm_bright_blue;
    padding: 10px;
    margin: 6px;
    color: $white;
    div{
        display:inline-block;
    }
}
.assign-snotes{
    width:75%;
}
.assign-img{
    width:25%;
    max-height: 100px;
}

.content {
    width:75%;
    height: 80%;
    //padding-left: 20px;
    margin-left: 20%;
    border: 4px;
}
.notification {
    width: 10%;
    height: 20%;
    font-size: 40pt;
    background-image: url('');
}
.title {
    width: 78%;
    height: 100%;
    text-align: left;
    padding-left: 2%;
    font-size: 16pt;
}
</style>