<template>
    <div class="m-content">
        <div> <!-- TODO: do something meaningful with this binding/clean up -->
            <h1 v-show="content===null"> No Lesson Selected </h1>
            <div v-show="content!==null">
                <h1> {{key}} from {{path}}</h1>
                <p> {{parse_path}} </p>
                <p> {{find_db_lesson_id}} </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./leaf-view.ts"></script>
<style scoped lang="scss">
@import "../styles/common.scss";
</style>