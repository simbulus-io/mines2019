<template>
    <div class="m-content">
        <div> <!-- TODO: do something meaningful with this binding/clean up -->
            <h1 v-show="lesson_id===''"> No Lesson Selected </h1>
            <div v-show="lesson_id!==''">
                <h1>Lesson {{lesson_id}}</h1>
                <h4>Status: {{lesson_status}}</h4>
                <h4>Notes</h4>
                <textarea
                    class="lesson-input"
                    v-model="lesson_notes"
                    rows="5">
                </textarea>
                <!-- <textarea
                    class="lesson-input"
                    v-model="lesson_keywords"
                    rows="5">
                </textarea> -->
                <h4>Keywords</h4>
                <vue-tags-input
                    v-model="tag"
                    :allow-edit-tags="true"
                    :tags="lesson_keywords"
                    @tags-changed="newTags => tags = newTags"/>
                <!-- TODO: make text area prettier and have spaces in between items in the array -->
                <!-- TODO: maybe make each note it's own text area? -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./leaf-view.ts"></script>
<style scoped lang="scss">
@import "../styles/common.scss";
.lesson-input {
    width: 100%;
}
</style>