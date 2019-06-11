<template>
   <div class="accordion">
        <div class="tab__header">
            <a href="#" class="tab__link p-4 block bg-blue-dark hover:bg-blue-darker no-underline text-white border-b-2 border-white flex justify-between" @click.prevent="active = !active">
                <span class="title"><strong>{{get_assignment.title}}</strong></span>
                <span class="down-Arrow" v-show="!active">&#9660;</span>
                <span class="up-Arrow" v-show="active">&#9650;</span>
            </a>
        </div>
            <!-- <div class="tab__content p-2" v-show="active" v-if="typeContent===Array"><div v-for="robby in getContent" :key=robby>
                <span>{{ robby.howard }}</span>
                </div><slot /></div> -->
            <div class="tab__content" v-show="active">
                <!-- <span class="pumpImg">
                    <img src = "./pumpImg.png"/>
                </span>
                <span class="content">
                    <ul>
                        <li>{{content}}</li>
                        <li>boo</li>
                    </ul>
                </span> -->
                <router-link :to="{ name: 'studentassignment', params: { idx: assign_idx } }">
                    <div class="assign-img">
                        <img v-bind:src="get_img_path" :alt="get_assignment.title+' worksheet. Can\'t find '+get_assignment.url" width="100%">
                    </div>
                </router-link>
                <div class="assign-snotes">
                    <snote-slug v-for="curr_note in snotes" :note_idx="curr_note.idx" :key="curr_note.idx" />
                </div>
            </div>            
        </div>
</template>

<script lang="ts" src="./studentaccordion.ts">

</script>
<style scoped lang="scss">

$accordion_height: 60px;
.tab__header {
    width: 96%;
    height: $accordion_height;
    padding: 10px;
    border: none;
    margin: 3px;
    background-color: rgba(19, 15, 64,1.0);
    color:rgba(255,255,255,1.0);
    font-family: sans-serif;
    a{
        color:rgba(255,255,255,1.0);
    }
}
.tab__header span {
    float: left;
}
.tab__content {
    width: 96%;
    height: auto;
    background-color: rgba(104, 109, 224,1.0);
    padding: 10px;
    margin: 6px;
    color: white;
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