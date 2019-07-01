<template>
    <div class="m-content">
        <div> <!-- TODO: do something meaningful with this binding/clean up -->
            <h1 v-show="lesson_id===''"> No Lesson Selected </h1>
            <div v-show="lesson_id!==''">
                <h1>Lesson {{lesson_id}}</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./leaf-view.ts"></script>
<style scoped lang="scss">
@import "../styles/common.scss";
</style>